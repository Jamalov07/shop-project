import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import {
	SellingCreateOneResponse,
	SellingFindManyData,
	SellingFindManyResponse,
	SellingFindOneData,
	SellingFindOneResponse,
	SellingGetPeriodStatsData,
	SellingGetPeriodStatsResponse,
	SellingGetTotalStatsData,
	SellingGetTotalStatsResponse,
	SellingModifyResposne,
	SellingProduct,
	SellingProductProductStorehouse,
} from '../interfaces'
import { GlobalModifyResponseDto, GlobalResponseDto, PaginationResponseDto } from '@common'
import { SellingRequiredDto } from './fields.dtos'
import { PaymentFindOneData, PaymentFindOneDataDto } from '../../payment'
import { ClientFindOneData, ClientFindOneDataDto } from '../../client'
import { StaffFindOneData, StaffFindOneDataDto } from '../../staff'
import { ProductFindOneData, ProductFindOneDataDto } from '../../product'
import { StorehouseFindOneData, StorehouseFindOneDataDto } from '../../storehouse'

export class SellingProductProductStorehouseDto implements SellingProductProductStorehouse {
	@ApiProperty({ type: ProductFindOneDataDto })
	product: ProductFindOneData

	@ApiProperty({ type: StorehouseFindOneDataDto })
	storehouse: StorehouseFindOneData
}
export class SellingProductDto implements SellingProduct {
	@ApiProperty({ type: SellingProductProductStorehouseDto })
	productStorehouse: SellingProductProductStorehouse

	@ApiProperty({ type: Number })
	quantity: number
}

export class SellingFindOneDataDto extends PickType(SellingRequiredDto, ['id', 'createdAt', 'totalSum']) implements SellingFindOneData {
	@ApiProperty({ type: PaymentFindOneDataDto, isArray: true })
	payments?: PaymentFindOneData[]

	@ApiProperty({ type: ClientFindOneDataDto })
	client?: ClientFindOneData

	@ApiProperty({ type: StaffFindOneDataDto })
	staff?: StaffFindOneData

	@ApiProperty({ type: SellingProductDto, isArray: true })
	products?: SellingProduct[]

	@ApiProperty({ type: BigInt })
	debt?: bigint
}

export class SellingFindManyDataDto extends PaginationResponseDto implements SellingFindManyData {
	@ApiProperty({ type: SellingFindOneDataDto, isArray: true })
	data: SellingFindOneData[]
}

export class SellingFindManyResponseDto extends GlobalResponseDto implements SellingFindManyResponse {
	@ApiProperty({ type: SellingFindManyDataDto })
	data: SellingFindManyData | { data: SellingFindOneData[] }
}

export class SellingFindOneResponseDto extends GlobalResponseDto implements SellingFindOneResponse {
	@ApiProperty({ type: SellingFindOneDataDto })
	data: SellingFindOneData
}

export class SellingModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) implements SellingModifyResposne {}

export class SellingGetTotalStatsDataDto implements SellingGetTotalStatsData {
	@ApiProperty({ type: BigInt })
	monthly: bigint

	@ApiProperty({ type: BigInt })
	daily: bigint

	@ApiProperty({ type: BigInt })
	weekly: bigint

	@ApiProperty({ type: BigInt })
	yearly: bigint

	@ApiProperty({ type: BigInt })
	ourDebt: bigint

	@ApiProperty({ type: BigInt })
	theirDebt: bigint
}
export class SellingGetTotalStatsResponseDto extends GlobalResponseDto implements SellingGetTotalStatsResponse {
	@ApiProperty({ type: SellingGetTotalStatsDataDto })
	data: SellingGetTotalStatsData
}

export class SellingGetPeriodStatsDataDto implements SellingGetPeriodStatsData {
	@ApiProperty({ type: BigInt })
	sum: bigint

	@ApiProperty({ type: String })
	date: string
}

export class SellingGetPeriodStatsResponseDto extends GlobalResponseDto implements SellingGetPeriodStatsResponse {
	@ApiProperty({ type: SellingGetPeriodStatsDataDto, isArray: true })
	data: SellingGetPeriodStatsData[]
}

export class SellingCreateOneResponseDto extends GlobalResponseDto implements SellingCreateOneResponse {
	@ApiProperty({ type: SellingFindOneDataDto })
	data: SellingFindOneData
}
