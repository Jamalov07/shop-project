import { Controller, Get, Res } from '@nestjs/common'
import { Response } from 'express'

@Controller()
export class AppController {
	@Get()
	main(@Res() response: Response) {
		return response.redirect('/index.html')
	}
}
