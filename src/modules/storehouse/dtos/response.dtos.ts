import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { StorehouseFindManyData, StorehouseFindManyResponse, StorehouseFindOneData, StorehouseFindOneResponse, StorehouseModifyResposne, StorehouseProduct } from '../interfaces'
import { GlobalModifyResponseDto, GlobalResponseDto, PaginationResponseDto } from '@common'
import { StorehouseRequiredDto } from './fields.dtos'
import { ProductFindOneData, ProductFindOneDataDto } from '../../product'
import { ProductStorehouseRequiredDto } from '../../product-storehouse'

export class StorehouseProductDto extends PickType(ProductStorehouseRequiredDto, ['id', 'quantity']) implements StorehouseProduct {
	@ApiProperty({ type: ProductFindOneDataDto })
	product: ProductFindOneData
}

export class StorehouseFindOneDataDto extends PickType(StorehouseRequiredDto, ['id', 'name', 'hexColor', 'position', 'createdAt']) implements StorehouseFindOneData {
	@ApiProperty({ type: StorehouseProductDto })
	products?: StorehouseProduct[]

	@ApiProperty({ type: Number })
	totalPackagesCount?: number

	@ApiProperty({ type: BigInt })
	totalPackagesCost?: bigint

	@ApiProperty({ type: BigInt })
	totalPackagesPrice?: bigint
}

export class StorehouseFindManyDataDto extends PaginationResponseDto implements StorehouseFindManyData {
	@ApiProperty({ type: StorehouseFindOneDataDto, isArray: true })
	data: StorehouseFindOneData[]
}

export class StorehouseFindManyResponseDto extends GlobalResponseDto implements StorehouseFindManyResponse {
	@ApiProperty({ type: StorehouseFindManyDataDto })
	data: StorehouseFindManyData | { data: StorehouseFindOneData[] }
}

export class StorehouseFindOneResponseDto extends GlobalResponseDto implements StorehouseFindOneResponse {
	@ApiProperty({ type: StorehouseFindOneDataDto })
	data: StorehouseFindOneData
}

export class StorehouseModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) implements StorehouseModifyResposne {}
