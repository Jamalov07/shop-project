import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { map } from 'rxjs/operators'
import * as moment from 'moment'

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

		const convert = (date) => (date ? moment(date).format('YYYY-MM-DD HH:mm:ss') : null)
		const dateFields = ['createdAt', 'updatedAt', 'deletedAt']

		for (const key of dateFields) {
			if (obj[key]) {
				obj[key] = convert(obj[key])
			}
		}

		return obj
	}
}
