import { Body, Controller, Delete, Get, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { StorehouseService } from './storehouse.service'
import { AuthOptions, CheckPermissionGuard } from '@common'
import {
	StorehouseFindManyRequestDto,
	StorehouseCreateOneRequestDto,
	StorehouseUpdateOneRequestDto,
	StorehouseFindOneRequestDto,
	StorehouseFindManyResponseDto,
	StorehouseFindOneResponseDto,
	StorehouseModifyResponseDto,
	StorehouseProductCreateOneRequestDto,
	StorehouseProductDeleteOneRequestDto,
} from './dtos'

@ApiTags('Storehouse')
// @UseGuards(CheckPermissionGuard)
@Controller('storehouse')
export class StorehouseController {
	private readonly storehouseService: StorehouseService

	constructor(storehouseService: StorehouseService) {
		this.storehouseService = storehouseService
	}

	@Get('many')
	@ApiOkResponse({ type: StorehouseFindManyResponseDto })
	@ApiOperation({ summary: 'get all storehouses' })
	@AuthOptions(false, false)
	async findAll(@Query() query: StorehouseFindManyRequestDto): Promise<StorehouseFindManyResponseDto> {
		return this.storehouseService.findMany(query)
	}

	@Get('one')
	@ApiOperation({ summary: 'find one storehouse' })
	@ApiOkResponse({ type: StorehouseFindOneResponseDto })
	async getOne(@Query() query: StorehouseFindOneRequestDto): Promise<StorehouseFindOneResponseDto> {
		return this.storehouseService.findOne(query)
	}

	@Post('one')
	@ApiOperation({ summary: 'add one storehouse' })
	@ApiOkResponse({ type: StorehouseModifyResponseDto })
	async create(@Body() body: StorehouseCreateOneRequestDto): Promise<StorehouseModifyResponseDto> {
		return this.storehouseService.createOne(body)
	}

	@Patch('one')
	@ApiOperation({ summary: 'update one storehouse' })
	@ApiOkResponse({ type: StorehouseModifyResponseDto })
	async updateOne(@Query() query: StorehouseFindOneRequestDto, @Body() body: StorehouseUpdateOneRequestDto): Promise<StorehouseModifyResponseDto> {
		return this.storehouseService.updateOne(query, body)
	}

	@Delete('one')
	@ApiOperation({ summary: 'update one storehouse' })
	@ApiOkResponse({ type: StorehouseModifyResponseDto })
	async deleteOne(@Query() query: StorehouseFindOneRequestDto): Promise<StorehouseModifyResponseDto> {
		return this.storehouseService.deleteOne(query)
	}

	@Post('product/one')
	@ApiOperation({ summary: 'crate one storehouse product' })
	@ApiOkResponse({ type: StorehouseModifyResponseDto })
	async createOneStorehouseProduct(@Body() body: StorehouseProductCreateOneRequestDto): Promise<StorehouseModifyResponseDto> {
		return this.storehouseService.createOneStorehouseProduct(body)
	}

	@Delete('product/one')
	@ApiOperation({ summary: 'delete one storehouse product' })
	@ApiOkResponse({ type: StorehouseModifyResponseDto })
	async deleteOneStorehouseProduct(@Query() query: StorehouseProductDeleteOneRequestDto): Promise<StorehouseModifyResponseDto> {
		return this.storehouseService.deleteOne(query)
	}
}
