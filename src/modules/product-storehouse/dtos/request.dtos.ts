import { IntersectionType, PickType } from '@nestjs/swagger'
import { ProductStorehouseOptionalDto, ProductStorehouseRequiredDto } from './fields.dtos'
import { ProductStorehouseFindManyRequest } from '../interfaces'
import { PaginationRequestDto } from '../../../common'

export class ProductStorehouseFindManyRequestDto
	extends IntersectionType(PickType(ProductStorehouseOptionalDto, ['productId', 'storehouseId']), PaginationRequestDto)
	implements ProductStorehouseFindManyRequest {}

export class ProductStorehouseCreateOneRequestDto
	extends PickType(ProductStorehouseRequiredDto, ['productId', 'storehouseId', 'quantity'])
	implements ProductStorehouseCreateOneRequestDto {}

export class ProductStorehouseDeleteOneRequestDto extends PickType(ProductStorehouseRequiredDto, ['id']) implements ProductStorehouseDeleteOneRequestDto {}
