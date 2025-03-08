import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { ClientFindManyData, ClientFindOneData, ClientFindOneResponse, ClientModifyResposne } from '../interfaces'
import { GlobalModifyResponseDto, GlobalResponseDto, PaginationResponseDto } from '@common'
import { ClientRequiredDto } from './fields.dtos'

export class ClientFindOneDataDto extends PickType(ClientRequiredDto, ['id', 'phone', 'fullname', 'createdAt']) implements ClientFindOneData {
	@ApiProperty({ type: BigInt })
	debt: bigint

	@ApiProperty({ type: Date })
	lastSellingDate: Date
}

export class ClientFindManyDataDto extends PaginationResponseDto implements ClientFindManyData {
	@ApiProperty({ type: ClientFindOneDataDto, isArray: true })
	data: ClientFindOneData[]
}

export class ClientFindManyResponseDto extends GlobalResponseDto implements ClientFindManyResponseDto {
	@ApiProperty({ type: ClientFindManyDataDto })
	data: ClientFindManyData | { data: ClientFindOneData[] }
}

export class ClientFindOneResponseDto extends GlobalResponseDto implements ClientFindOneResponse {
	@ApiProperty({ type: ClientFindOneDataDto })
	data: ClientFindOneData
}

export class ClientModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) implements ClientModifyResposne {}
