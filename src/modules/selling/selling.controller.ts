import { Body, Controller, Delete, Get, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { SellingService } from './selling.service'
import { AuthOptions, CheckPermissionGuard } from '@common'
import {
	SellingFindManyRequestDto,
	SellingCreateOneRequestDto,
	SellingUpdateOneRequestDto,
	SellingFindOneRequestDto,
	SellingFindManyResponseDto,
	SellingFindOneResponseDto,
	SellingModifyResponseDto,
	SellingCreateOneWithPaymentRequestDto,
} from './dtos'

@ApiTags('Selling')
// @UseGuards(CheckPermissionGuard)
@Controller('selling')
export class SellingController {
	private readonly sellingService: SellingService

	constructor(sellingService: SellingService) {
		this.sellingService = sellingService
	}

	@Get('many')
	@ApiOkResponse({ type: SellingFindManyResponseDto })
	@ApiOperation({ summary: 'get all sellings' })
	@AuthOptions(false, false)
	async findAll(@Query() query: SellingFindManyRequestDto): Promise<SellingFindManyResponseDto> {
		return this.sellingService.findMany(query)
	}

	@Get('one')
	@ApiOperation({ summary: 'find one selling' })
	@ApiOkResponse({ type: SellingFindOneResponseDto })
	async getOne(@Query() query: SellingFindOneRequestDto): Promise<SellingFindOneResponseDto> {
		return this.sellingService.findOne(query)
	}

	@Post('one')
	@ApiOperation({ summary: 'add one selling' })
	@ApiOkResponse({ type: SellingModifyResponseDto })
	async create(@Body() body: SellingCreateOneRequestDto): Promise<SellingModifyResponseDto> {
		return this.sellingService.createOne(body)
	}

	@Post('one-with-payment')
	@ApiOperation({ summary: 'add one selling' })
	@ApiOkResponse({ type: SellingModifyResponseDto })
	async createOneWithPayment(@Body() body: SellingCreateOneWithPaymentRequestDto): Promise<SellingModifyResponseDto> {
		return this.sellingService.createOneWithPayment(body)
	}

	@Patch('one')
	@ApiOperation({ summary: 'update one selling' })
	@ApiOkResponse({ type: SellingModifyResponseDto })
	async updateOne(@Query() query: SellingFindOneRequestDto, @Body() body: SellingUpdateOneRequestDto): Promise<SellingModifyResponseDto> {
		return this.sellingService.updateOne(query, body)
	}

	@Delete('one')
	@ApiOperation({ summary: 'update one selling' })
	@ApiOkResponse({ type: SellingModifyResponseDto })
	async deleteOne(@Query() query: SellingFindOneRequestDto): Promise<SellingModifyResponseDto> {
		return this.sellingService.deleteOne(query)
	}
}
