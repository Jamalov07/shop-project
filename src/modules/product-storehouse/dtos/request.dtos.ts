import { ApiProperty, ApiPropertyOptional, IntersectionType, PickType } from '@nestjs/swagger'
import { ProductStorehouseOptionalDto, ProductStorehouseRequiredDto } from './fields.dtos'
import { ProductStorehouse, ProductStorehouseCreateOneRequest, ProductStorehouseFindManyRequest, ProductStorehouseTransferManyRequest } from '../interfaces'
import { PaginationRequestDto } from '../../../common'
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator'
import { Transform } from 'class-transformer'

export class ProductStorehouseFindManyRequestDto
	extends IntersectionType(PickType(ProductStorehouseOptionalDto, ['productId', 'storehouseId', 'quantity']), PaginationRequestDto)
	implements ProductStorehouseFindManyRequest
{
	@ApiPropertyOptional({ type: Number })
	@IsOptional()
	@Transform(({ value }) => Number(value))
	@IsNumber()
	maxQuantity?: number = Number.MAX_SAFE_INTEGER

	@ApiPropertyOptional({ type: Number })
	@IsOptional()
	@Transform(({ value }) => Number(value))
	@IsNumber()
	minQuantity?: number = 0
}

export class ProductStorehouseDto extends PickType(ProductStorehouseRequiredDto, ['id', 'quantity']) implements ProductStorehouse {}

export class ProductStorehouseCreateOneRequestDto
	extends PickType(ProductStorehouseRequiredDto, ['productId', 'storehouseId', 'quantity'])
	implements ProductStorehouseCreateOneRequest {}

export class ProductStorehouseDeleteOneRequestDto extends PickType(ProductStorehouseRequiredDto, ['id']) implements ProductStorehouseDeleteOneRequestDto {}

export class ProductStorehouseTransferManyRequestDto implements ProductStorehouseTransferManyRequest {
	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	fromStorehouseId: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	toStorehouseId: string

	@ApiProperty({ type: ProductStorehouseDto })
	products: ProductStorehouse[]
}
