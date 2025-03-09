import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { map } from 'rxjs/operators'

@Injectable()
export class TimezoneInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler) {
		return next.handle().pipe(
			map((data) => {
				if (!data) return data
				if (Array.isArray(data)) return data.map((item) => this.convertTimezone(item))
				return this.convertTimezone(data)
			}),
		)
	}

	private convertTimezone(obj: any) {
		if (!obj || typeof obj !== 'object') return obj

		const convert = (date) => (date ? new Date(date).toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' }) : null)

		for (const key in obj) {
			if (typeof obj[key] === 'string' && key.toLowerCase().includes('date')) {
				obj[key] = convert(obj[key])
			} else if (typeof obj[key] === 'object') {
				obj[key] = this.convertTimezone(obj[key])
			}
		}

		return obj
	}
}
