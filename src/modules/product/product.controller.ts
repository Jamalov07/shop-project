import { Body, Controller, Delete, Get, Patch, Post, Query, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { ProductService } from './product.service'
import { AuthOptions, CheckPermissionGuard } from '@common'
import {
	ProductFindManyRequestDto,
	ProductCreateOneRequestDto,
	ProductUpdateOneRequestDto,
	ProductFindOneRequestDto,
	ProductFindManyResponseDto,
	ProductFindOneResponseDto,
	ProductModifyResponseDto,
} from './dtos'
import { ExcelService } from '../shared'
import { Response } from 'express'

@ApiTags('Product')
// @UseGuards(CheckPermissionGuard)
@Controller('product')
export class ProductController {
	private readonly productService: ProductService
	private readonly excelService: ExcelService

	constructor(productService: ProductService, excelService: ExcelService) {
		this.productService = productService
		this.excelService = excelService
	}

	@Get('many')
	@ApiOkResponse({ type: ProductFindManyResponseDto })
	@ApiOperation({ summary: 'get all products' })
	@AuthOptions(false, false)
	async findMany(@Query() query: ProductFindManyRequestDto): Promise<ProductFindManyResponseDto> {
		return this.productService.findMany(query)
	}

	@Get('excel')
	@ApiOkResponse({ type: File })
	@ApiOperation({ summary: 'get all products in excel' })
	async downloanExcel(@Res() response: Response) {
		return this.excelService.exportProductsToExcel(response)
	}

	@Get('one')
	@ApiOperation({ summary: 'find one product' })
	@ApiOkResponse({ type: ProductFindOneResponseDto })
	async getOne(@Query() query: ProductFindOneRequestDto): Promise<ProductFindOneResponseDto> {
		return this.productService.findOne(query)
	}

	@Post('one')
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('image'))
	@ApiOperation({ summary: 'add one product' })
	@ApiOkResponse({ type: ProductModifyResponseDto })
	async createOne(@Body() body: ProductCreateOneRequestDto, @UploadedFile() image?: Express.Multer.File): Promise<ProductModifyResponseDto> {
		return this.productService.createOne({ ...body, image: image?.filename })
	}

	@Patch('one')
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('image'))
	@ApiOperation({ summary: 'update one product' })
	@ApiOkResponse({ type: ProductModifyResponseDto })
	async updateOne(
		@Query() query: ProductFindOneRequestDto,
		@Body() body: ProductUpdateOneRequestDto,
		@UploadedFile() image?: Express.Multer.File,
	): Promise<ProductModifyResponseDto> {
		return this.productService.updateOne(query, { ...body, image: image?.filename })
	}

	@Delete('one')
	@ApiOperation({ summary: 'update one product' })
	@ApiOkResponse({ type: ProductModifyResponseDto })
	async deleteOne(@Query() query: ProductFindOneRequestDto): Promise<ProductModifyResponseDto> {
		return this.productService.deleteOne(query)
	}
}
