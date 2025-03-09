import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import {
	SellingFindManyData,
	SellingFindManyResponse,
	SellingFindOneData,
	SellingFindOneResponse,
	SellingGetPeriodStatsData,
	SellingGetPeriodStatsResponse,
	SellingGetTotalStatsData,
	SellingGetTotalStatsResponse,
	SellingModifyResposne,
} from '../interfaces'
import { GlobalModifyResponseDto, GlobalResponseDto, PaginationResponseDto } from '@common'
import { SellingRequiredDto } from './fields.dtos'

export class SellingFindOneDataDto extends PickType(SellingRequiredDto, ['id', 'createdAt', 'totalSum']) implements SellingFindOneData {}

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
