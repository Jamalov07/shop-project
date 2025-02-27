import { Body, Controller, Delete, Post, Query, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ProductStorehouseService } from './product-storehouse.service'
import { ProductStorehouseCreateOneRequestDto, ProductStorehouseDeleteOneRequestDto, ProductStorehouseModifyResponseDto } from './dtos'

@ApiTags('ProductStorehouse')
// @UseGuards(CheckPermissionGuard)
@Controller('preoduct-storehouse')
export class ProductStorehouseController {
	private readonly productStorehouseService: ProductStorehouseService

	constructor(productStorehouseService: ProductStorehouseService) {
		this.productStorehouseService = productStorehouseService
	}

	@Post('one')
	@ApiOperation({ summary: 'crate one storehouse product' })
	@ApiOkResponse({ type: ProductStorehouseModifyResponseDto })
	async createOneProductStorehouse(@Body() body: ProductStorehouseCreateOneRequestDto): Promise<ProductStorehouseModifyResponseDto> {
		return this.productStorehouseService.createOne(body)
	}

	@Delete('one')
	@ApiOperation({ summary: 'delete one storehouse product' })
	@ApiOkResponse({ type: ProductStorehouseModifyResponseDto })
	async deleteOneProductStorehouse(@Query() query: ProductStorehouseDeleteOneRequestDto): Promise<ProductStorehouseModifyResponseDto> {
		return this.productStorehouseService.deleteOne(query)
	}
}
