import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { SellingFindManyData, SellingFindManyResponse, SellingFindOneData, SellingFindOneResponse, SellingModifyResposne } from '../interfaces'
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
