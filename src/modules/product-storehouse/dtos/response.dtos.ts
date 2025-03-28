import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { ProductStorehouseFindManyData, ProductStorehouseFindOneData, ProductStorehouseFindOneResponse, ProductStorehouseModifyResposne } from '../interfaces'
import { GlobalModifyResponseDto, GlobalResponseDto, PaginationResponseDto } from '@common'
import { ProductStorehouseRequiredDto } from './fields.dtos'
import { ProductFindOneData } from '../../product/interfaces'
import { StorehouseFindOneData, StorehouseFindOneDataDto } from '../../storehouse'
import { ProductFindOneDataDto } from '../../product/dtos'

export class ProductStorehouseFindOneDataDto extends PickType(ProductStorehouseRequiredDto, ['id', 'createdAt', 'quantity']) implements ProductStorehouseFindOneData {
	@ApiProperty({ type: ProductFindOneDataDto })
	product?: ProductFindOneData

	@ApiProperty({ type: StorehouseFindOneDataDto })
	storehouse?: StorehouseFindOneData
}

export class ProductStorehouseFindManyDataDto extends PaginationResponseDto implements ProductStorehouseFindManyData {
	@ApiProperty({ type: ProductStorehouseFindOneDataDto, isArray: true })
	data: ProductStorehouseFindOneData[]
}

export class ProductStorehouseFindManyResponseDto extends GlobalResponseDto implements ProductStorehouseFindManyResponseDto {
	@ApiProperty({ type: ProductStorehouseFindManyDataDto })
	data: ProductStorehouseFindManyData | { data: ProductStorehouseFindOneData[] }
}

export class ProductStorehouseFindOneResponseDto extends GlobalResponseDto implements ProductStorehouseFindOneResponse {
	@ApiProperty({ type: ProductStorehouseFindOneDataDto })
	data: ProductStorehouseFindOneData
}

export class ProductStorehouseModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) implements ProductStorehouseModifyResposne {}
