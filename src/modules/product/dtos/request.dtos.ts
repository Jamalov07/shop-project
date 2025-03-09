import { PickType, IntersectionType, ApiProperty } from '@nestjs/swagger'
import {
	ProductCreateOneRequest,
	ProductDeleteOneRequest,
	ProductFindManyRequest,
	ProductFindOneforSellingRequest,
	ProductFindOneRequest,
	ProductUpdateOneRequest,
} from '../interfaces'
import { PaginationRequestDto } from '@common'
import { ProductOptionalDto, ProductRequiredDto } from './fields.dtos'
import { IsNotEmpty, IsNumber } from 'class-validator'
import { Transform } from 'class-transformer'

export class ProductFindManyRequestDto extends IntersectionType(PickType(ProductOptionalDto, ['name']), PaginationRequestDto) implements ProductFindManyRequest {}

export class ProductFindOneRequestDto extends IntersectionType(PickType(ProductRequiredDto, ['id'])) implements ProductFindOneRequest {}

export class ProductFindOneForSellingRequestDto extends IntersectionType(PickType(ProductRequiredDto, ['id'])) implements ProductFindOneforSellingRequest {
	@ApiProperty({ type: Number })
	@IsNotEmpty()
	@IsNumber()
	@Transform(({ value }) => Number(value))
	minQuantity: number
}

export class ProductCreateOneRequestDto
	extends IntersectionType(PickType(ProductRequiredDto, ['name', 'cost', 'price', 'quantity', 'warningThreshold', 'image']))
	implements ProductCreateOneRequest {}

export class ProductUpdateOneRequestDto
	extends IntersectionType(PickType(ProductOptionalDto, ['name', 'cost', 'price', 'quantity', 'warningThreshold', 'image']))
	implements ProductUpdateOneRequest {}

export class ProductDeleteOneRequestDto extends IntersectionType(PickType(ProductRequiredDto, ['id'])) implements ProductDeleteOneRequest {}
