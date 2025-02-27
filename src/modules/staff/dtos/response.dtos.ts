import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { StaffFindManyData, StaffFindOneData, StaffFindOneResponse, StaffModifyResposne } from '../interfaces'
import { GlobalModifyResponseDto, GlobalResponseDto, PaginationResponseDto } from '@common'
import { StaffRequiredDto } from './fields.dtos'

export class StaffFindOneDataDto extends PickType(StaffRequiredDto, ['id', 'phone', 'fullname', 'createdAt', 'deletedAt']) implements StaffFindOneData {}

export class StaffFindManyDataDto extends PaginationResponseDto implements StaffFindManyData {
	@ApiProperty({ type: StaffFindOneDataDto, isArray: true })
	data: StaffFindOneData[]
}

export class StaffFindManyResponseDto extends GlobalResponseDto implements StaffFindManyResponseDto {
	@ApiProperty({ type: StaffFindManyDataDto })
	data: StaffFindManyData | StaffFindOneData[]
}

export class StaffFindOneResponseDto extends GlobalResponseDto implements StaffFindOneResponse {
	@ApiProperty({ type: StaffFindOneDataDto })
	data: StaffFindOneData
}

export class StaffModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) implements StaffModifyResposne {}
