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
export class StaffFindOneActionIdsDto {
	@ApiProperty({ type: String, isArray: true })
	actionIds?: string[]
}
export class StaffFindOneResponseDto extends GlobalResponseDto implements StaffFindOneResponse {
	@ApiProperty({ type: IntersectionType(StaffFindOneDataDto, StaffFindOneActionIdsDto) })
	data: StaffFindOneData & { actionIds?: string[] }
}

export class StaffModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) implements StaffModifyResposne {}
