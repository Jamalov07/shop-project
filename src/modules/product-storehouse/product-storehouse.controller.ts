import { Body, Controller, Delete, Get, Post, Query, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ProductStorehouseService } from './product-storehouse.service'
import {
	ProductStorehouseCreateOneRequestDto,
	ProductStorehouseDeleteOneRequestDto,
	ProductStorehouseFindManyRequestDto,
	ProductStorehouseFindManyResponseDto,
	ProductStorehouseModifyResponseDto,
} from './dtos'

@ApiTags('ProductStorehouse')
// @UseGuards(CheckPermissionGuard)
@Controller('product-storehouse')
export class ProductStorehouseController {
	private readonly productStorehouseService: ProductStorehouseService

	constructor(productStorehouseService: ProductStorehouseService) {
		this.productStorehouseService = productStorehouseService
	}

	@Get('many')
	@ApiOkResponse({ type: ProductStorehouseFindManyResponseDto })
	@ApiOperation({ summary: 'get all product storehouse' })
	async findMany(@Query() query: ProductStorehouseFindManyRequestDto): Promise<ProductStorehouseFindManyResponseDto> {
		return this.productStorehouseService.findMany(query)
	}

	@Post('one')
	@ApiOperation({ summary: 'crate one product storehouse' })
	@ApiOkResponse({ type: ProductStorehouseModifyResponseDto })
	async createOne(@Body() body: ProductStorehouseCreateOneRequestDto): Promise<ProductStorehouseModifyResponseDto> {
		return this.productStorehouseService.createOne(body)
	}

	@Delete('one')
	@ApiOperation({ summary: 'delete one product storehouse' })
	@ApiOkResponse({ type: ProductStorehouseModifyResponseDto })
	async deleteOne(@Query() query: ProductStorehouseDeleteOneRequestDto): Promise<ProductStorehouseModifyResponseDto> {
		return this.productStorehouseService.deleteOne(query)
	}
}
