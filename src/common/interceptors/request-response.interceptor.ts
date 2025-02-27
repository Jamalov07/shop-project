import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import * as colors from 'colors'

@Injectable()
export class RequestResponseInterceptor implements NestInterceptor {
	private readonly logger = new Logger(RequestResponseInterceptor.name)

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const request = context.switchToHttp().getRequest()

		const requestInfo: any = { ip: request.ip, url: request.url, method: request.method, startDate: new Date().toISOString() }
		const startTime = Date.now()

		return next.handle().pipe(
			tap({
				next: (data) => {
					const responseTime = Date.now() - startTime
					const responseInfo: any = {
						endDate: new Date(),
						responseTime: responseTime + ` ms`,
						result: {
							success: data.success?.is ? data.success?.is : data.error?.is ? false : true,
							warning: data.warning?.is,
							error: data.error?.is,
						},
					}
					this.logger.debug(colors.magenta({ ...requestInfo, ...responseInfo }))
				},
				error: (error) => {
					console.log(error)
					const responseTime = Date.now() - startTime
					const responseInfo: any = {
						endDate: new Date(),
						responseTime: responseTime + ` ms`,
						result: { success: false, warning: false, error: true },
					}
					this.logger.debug(colors.magenta({ ...requestInfo, ...responseInfo }))
					this.logger.error(colors.magenta(error?.response?.message))
				},
			}),
		)
	}
}
