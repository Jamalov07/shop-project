import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import {
	PCalc,
	ProductCalc,
	ProductFindManyData,
	ProductFindManyResponse,
	ProductFindOneData,
	ProductFindOneForSellingResponse,
	ProductFindOneResponse,
	ProductModifyResposne,
} from '../interfaces'
import { GlobalModifyResponseDto, GlobalResponseDto, PaginationResponseDto } from '@common'
import { ProductRequiredDto } from './fields.dtos'
import { ProductStorehouseFindOneData, ProductStorehouseFindOneDataDto } from '../../product-storehouse'

export class ProductFindOneDataDto
	extends PickType(ProductRequiredDto, ['id', 'name', 'cost', 'price', 'quantity', 'warningThreshold', 'createdAt'])
	implements ProductFindOneData
{
	@ApiProperty({ type: Number })
	countInStorehouses: number
}

export class PCalcDto implements PCalc {
	@ApiProperty({ type: BigInt })
	totalCost: bigint

	@ApiProperty({ type: BigInt })
	totalPrice: bigint

	@ApiProperty({ type: Number })
	totalPackages: number

	@ApiProperty({ type: Number })
	totalQuantityInPackages: number
}

export class ProductCalcDto implements ProductCalc {
	@ApiProperty({ type: PCalcDto })
	inPage: PCalc

	@ApiProperty({ type: PCalcDto })
	inTotal: PCalc
}

export class ProductFindManyDataDto extends PaginationResponseDto implements ProductFindManyData {
	@ApiProperty({ type: ProductFindOneDataDto, isArray: true })
	data: ProductFindOneData[]

	@ApiProperty({ type: ProductCalcDto })
	calc: ProductCalc
}

export class ProductFindManyResponseDto extends GlobalResponseDto implements ProductFindManyResponse {
	@ApiProperty({ type: ProductFindManyDataDto })
	data: ProductFindManyData | { data: ProductFindOneData[] }
}

export class ProductFindOneResponseDto extends GlobalResponseDto implements ProductFindOneResponse {
	@ApiProperty({ type: ProductFindOneDataDto })
	data: ProductFindOneData
}
export class ProductFindOneForSellingStorehousesDto {
	@ApiProperty({ type: ProductStorehouseFindOneDataDto })
	storehouses: ProductStorehouseFindOneData[]
}
export class ProductFindOneForSellingResponseDto extends GlobalResponseDto implements ProductFindOneForSellingResponse {
	@ApiProperty({ type: IntersectionType(ProductFindOneDataDto, ProductFindOneForSellingStorehousesDto) })
	data: ProductFindOneData & { storehouses: ProductStorehouseFindOneData[] }
}

export class ProductModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) implements ProductModifyResposne {}
