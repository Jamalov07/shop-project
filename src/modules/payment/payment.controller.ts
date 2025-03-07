import { Body, Controller, Delete, Get, Patch, Post, Query, Req, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { PaymentService } from './payment.service'
import { AuthOptions, CheckPermissionGuard, CRequest } from '@common'
import {
	PaymentFindManyRequestDto,
	PaymentCreateOneRequestDto,
	PaymentUpdateOneRequestDto,
	PaymentFindOneRequestDto,
	PaymentFindManyResponseDto,
	PaymentFindOneResponseDto,
	PaymentModifyResponseDto,
} from './dtos'

@ApiTags('Payment')
// @UseGuards(CheckPermissionGuard)
@Controller('payment')
export class PaymentController {
	private readonly paymentService: PaymentService

	constructor(paymentService: PaymentService) {
		this.paymentService = paymentService
	}

	@Get('many')
	@ApiOkResponse({ type: PaymentFindManyResponseDto })
	@ApiOperation({ summary: 'get all payments' })
	@AuthOptions(false, false)
	async findAll(@Query() query: PaymentFindManyRequestDto): Promise<PaymentFindManyResponseDto> {
		return this.paymentService.findMany(query)
	}

	@Get('one')
	@ApiOperation({ summary: 'find one payment' })
	@ApiOkResponse({ type: PaymentFindOneResponseDto })
	async getOne(@Query() query: PaymentFindOneRequestDto): Promise<PaymentFindOneResponseDto> {
		return this.paymentService.findOne(query)
	}

	@Post('one')
	@AuthOptions(true, true)
	@ApiOperation({ summary: 'add one payment' })
	@ApiOkResponse({ type: PaymentModifyResponseDto })
	async create(@Body() body: PaymentCreateOneRequestDto, @Req() req: CRequest): Promise<PaymentModifyResponseDto> {
		return this.paymentService.createOnePro({ ...body, staffId: req.staff.id })
	}

	@Patch('one')
	@AuthOptions(true, true)
	@ApiOperation({ summary: 'update one payment' })
	@ApiOkResponse({ type: PaymentModifyResponseDto })
	async updateOne(@Query() query: PaymentFindOneRequestDto, @Body() body: PaymentUpdateOneRequestDto): Promise<PaymentModifyResponseDto> {
		return this.paymentService.updateOne(query, body)
	}
}
