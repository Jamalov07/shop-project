import { PickType } from '@nestjs/swagger'
import { ProductStorehouseRequiredDto } from './fields.dtos'

export class ProductStorehouseCreateOneRequestDto
	extends PickType(ProductStorehouseRequiredDto, ['productId', 'storehouseId', 'quantity'])
	implements ProductStorehouseCreateOneRequestDto {}

export class ProductStorehouseDeleteOneRequestDto extends PickType(ProductStorehouseRequiredDto, ['id']) implements ProductStorehouseDeleteOneRequestDto {}
