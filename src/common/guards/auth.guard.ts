import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common'
import { StaffOptional } from '../../modules'
import { PrismaService } from '../../modules/shared'
import { Request } from 'express'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import * as colors from 'colors'

@Injectable()
export class AuthGuard implements CanActivate {
	private readonly logger = new Logger(AuthGuard.name)

	constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		private readonly reflector: Reflector,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const authOptions = this.reflector.get<{ isAuthRequired: boolean; isStaffRequired: boolean }>('authOptions', context.getHandler())
		const isAuthRequired = authOptions?.isAuthRequired
		const isStaffRequired = authOptions?.isStaffRequired

		const request = context.switchToHttp().getRequest()

		const token = this.extractTokenFromHeader(request, isAuthRequired)

		if (isStaffRequired) {
			if (!token) {
				throw new UnauthorizedException('Token not provided')
			} else {
				const staff = await this.parseTokenWithJwt(token, isStaffRequired)
				request['staff'] = staff
				this.logger.debug(colors.cyan(request['staff']))

				return true
			}
		} else {
			if (!token) {
				return true
			} else {
				const staff = await this.parseTokenWithJwt(token, isStaffRequired)
				if (Object.keys(staff).length) {
					request['staff'] = staff
				}
				this.logger.debug(colors.cyan(request['staff']))

				return true
			}
		}
	}
	private extractTokenFromHeader(request: Request, isAuthRequired: boolean): string | undefined {
		const authorizationHeader = request.headers.authorization

		if (isAuthRequired) {
			if (!authorizationHeader) {
				throw new UnauthorizedException('Authorization header not provided')
			}

			const [type, token] = authorizationHeader.split(' ') ?? []
			return type === 'Bearer' ? token : undefined
		} else {
			if (authorizationHeader) {
				const [type, token] = authorizationHeader.split(' ') ?? []
				return type === 'Bearer' ? token : undefined
			}
			return undefined
		}
	}

	private async parseTokenWithJwt(token: string, isStaffRequired: boolean) {
		try {
			const payload = await this.jwtService.verifyAsync(token, { secret: this.configService.get('jwt.accessToken.key') })

			if (!payload || !payload?.id) {
				if (isStaffRequired) {
					throw new UnauthorizedException('invalid token')
				}
			}
			let staff: StaffOptional
			if (payload?.id) {
				staff = await this.prisma.staffModel.findFirst({ where: { id: payload?.id } })
			}

			if (isStaffRequired) {
				if (!staff) {
					throw new UnauthorizedException('staff not found with this token')
				}
				if (staff.deletedAt) {
					throw new UnauthorizedException('staff was deleted')
				}
			}

			return { id: staff?.id }
		} catch (e) {
			if (isStaffRequired) {
				throw new UnauthorizedException(e?.message || e)
			} else {
				return {}
			}
		}
	}
}
