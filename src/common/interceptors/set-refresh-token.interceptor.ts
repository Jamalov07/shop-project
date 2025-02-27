import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException, Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../../modules/shared'
import { ConfigService } from '@nestjs/config'
import { Observable } from 'rxjs'
import { isJWT } from 'class-validator'
import * as colors from 'colors'

@Injectable()
export class RefreshTokenInterceptor implements NestInterceptor {
	private readonly logger = new Logger('RefreshTokenInterceptor')

	constructor(
		private readonly configService: ConfigService,
		private readonly prismaService: PrismaService,
		private readonly jwtService: JwtService,
	) {}

	async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
		const request = context.switchToHttp().getRequest()
		const authorizationHeader = request.headers.authorization

		if (!authorizationHeader) {
			throw new UnauthorizedException('Authorization header not provided')
		}

		const [type, token] = authorizationHeader.split(' ') ?? []

		if (type !== 'Bearer') {
			throw new UnauthorizedException('Invalid authorization type')
		}

		if (!token) {
			throw new UnauthorizedException('Token not provided')
		}

		if (!isJWT(token)) {
			throw new UnauthorizedException('Invalid token format')
		}

		try {
			const payload = await this.jwtService.verifyAsync(token, { secret: this.configService.get('jwt.refreshToken.key') })

			if (!payload || !payload?.id) {
				throw new UnauthorizedException('Invalid token payload')
			}

			const staff = await this.prismaService.staffModel.findFirst({
				where: { id: payload?.id, token: token },
			})

			if (!staff) {
				throw new UnauthorizedException('Staff not found with this token')
			}

			if (staff.deletedAt) {
				throw new UnauthorizedException('Staff was deleted')
			}

			request['staff'] = { id: staff.id, token: token }

			this.logger.debug(colors.magenta({ ...request['staff'] }))

			return next.handle()
		} catch (e) {
			throw new UnauthorizedException(e?.message || 'Token validation failed')
		}
	}
}
