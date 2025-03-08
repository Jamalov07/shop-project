import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { StaffFindManyData, StaffFindManyResponse, StaffFindOneData, StaffFindOneResponse, StaffModifyResposne } from '../interfaces'
import { GlobalModifyResponseDto, GlobalResponseDto, PaginationResponseDto } from '@common'
import { StaffRequiredDto } from './fields.dtos'

export class StaffFindOneDataDto extends PickType(StaffRequiredDto, ['id', 'phone', 'fullname', 'createdAt', 'deletedAt']) implements StaffFindOneData {}

export class StaffFindManyDataDto extends PaginationResponseDto implements StaffFindManyData {
	@ApiProperty({ type: StaffFindOneDataDto, isArray: true })
	data: StaffFindOneData[]
}

export class StaffFindManyResponseDto extends GlobalResponseDto implements StaffFindManyResponse {
	@ApiProperty({ type: StaffFindManyDataDto })
	data: StaffFindManyData | { data: StaffFindOneData[] }
}

export class StaffFindOneResponseDto extends GlobalResponseDto implements StaffFindOneResponse {
	@ApiProperty({ type: StaffFindOneDataDto })
	data: StaffFindOneData
}

export class StaffModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) implements StaffModifyResposne {}
