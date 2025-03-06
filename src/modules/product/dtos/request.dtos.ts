import { PickType, IntersectionType } from '@nestjs/swagger'
import { ProductCreateOneRequest, ProductDeleteOneRequest, ProductFindManyRequest, ProductFindOneRequest, ProductUpdateOneRequest } from '../interfaces'
import { PaginationRequestDto } from '@common'
import { ProductOptionalDto, ProductRequiredDto } from './fields.dtos'

export class ProductFindManyRequestDto extends IntersectionType(PickType(ProductOptionalDto, ['name']), PaginationRequestDto) implements ProductFindManyRequest {}

export class ProductFindOneRequestDto extends IntersectionType(PickType(ProductRequiredDto, ['id'])) implements ProductFindOneRequest {}

export class ProductCreateOneRequestDto
	extends IntersectionType(PickType(ProductRequiredDto, ['name', 'cost', 'price', 'quantity', 'warningThreshold', 'image']))
	implements ProductCreateOneRequest {}

export class ProductUpdateOneRequestDto
	extends IntersectionType(PickType(ProductOptionalDto, ['name', 'cost', 'price', 'quantity', 'warningThreshold', 'image']))
	implements ProductUpdateOneRequest {}

export class ProductDeleteOneRequestDto extends IntersectionType(PickType(ProductRequiredDto, ['id'])) implements ProductDeleteOneRequest {}
