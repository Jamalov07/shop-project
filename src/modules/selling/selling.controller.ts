import { Body, Controller, Delete, Get, Patch, Post, Query, Req, Res, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { SellingService } from './selling.service'
import { AuthOptions, CheckPermissionGuard, CRequest } from '@common'
import {
	SellingFindManyRequestDto,
	SellingCreateOneRequestDto,
	SellingUpdateOneRequestDto,
	SellingFindOneRequestDto,
	SellingFindManyResponseDto,
	SellingFindOneResponseDto,
	SellingModifyResponseDto,
	SellingGetTotalStatsResponseDto,
	SellingGetTotalStatsRequestDto,
	SellingGetPeriodStatsRequestDto,
	SellingGetPeriodStatsResponseDto,
} from './dtos'
import { Response } from 'express'
import { ExcelService } from '../shared'
import { File } from 'buffer'

@ApiTags('Selling')
// @UseGuards(CheckPermissionGuard)
@Controller('selling')
export class SellingController {
	private readonly sellingService: SellingService
	private readonly excelService: ExcelService

	constructor(sellingService: SellingService, excelService: ExcelService) {
		this.sellingService = sellingService
		this.excelService = excelService
	}

	@Get('many')
	@ApiOkResponse({ type: SellingFindManyResponseDto })
	@ApiOperation({ summary: 'get all sellings' })
	@AuthOptions(false, false)
	async findMany(@Query() query: SellingFindManyRequestDto): Promise<SellingFindManyResponseDto> {
		return this.sellingService.findMany(query)
	}

	@Get('total-stats')
	@ApiOkResponse({ type: SellingGetTotalStatsResponseDto })
	@ApiOperation({ summary: 'get total stats' })
	@AuthOptions(false, false)
	async getTotalStats(@Query() query: SellingGetTotalStatsRequestDto): Promise<SellingGetTotalStatsResponseDto> {
		return this.sellingService.getTotalStats(query)
	}

	@Get('period-stats')
	@ApiOkResponse({ type: SellingGetPeriodStatsResponseDto })
	@ApiOperation({ summary: 'get period stats' })
	@AuthOptions(false, false)
	async getPeriodStats(@Query() query: SellingGetPeriodStatsRequestDto): Promise<SellingGetPeriodStatsResponseDto> {
		return this.sellingService.getPeriodStats(query)
	}

	@Get('excel')
	@ApiOkResponse({ type: File })
	@ApiOperation({ summary: 'get all sellings in excel' })
	async downloanExcel(@Query() query: SellingFindManyRequestDto, @Res() response: Response) {
		return this.excelService.exportSellingsToExcel(query, response)
	}

	@Get('one')
	@ApiOperation({ summary: 'find one selling' })
	@ApiOkResponse({ type: SellingFindOneResponseDto })
	async getOne(@Query() query: SellingFindOneRequestDto): Promise<SellingFindOneResponseDto> {
		return this.sellingService.findOne(query)
	}

	@Post('one')
	@AuthOptions(true, true)
	@ApiOperation({ summary: 'add one selling' })
	@ApiOkResponse({ type: SellingModifyResponseDto })
	async createOne(@Body() body: SellingCreateOneRequestDto, @Req() req: CRequest): Promise<SellingModifyResponseDto> {
		return this.sellingService.createOne({ ...body, staffId: req.staff.id })
	}

	// @Post('one-with-payment')
	// @ApiOperation({ summary: 'add one selling' })
	// @ApiOkResponse({ type: SellingModifyResponseDto })
	// async createOneWithPayment(@Body() body: SellingCreateOneWithPaymentRequestDto): Promise<SellingModifyResponseDto> {
	// 	return this.sellingService.createOneWithPayment(body)
	// }

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
