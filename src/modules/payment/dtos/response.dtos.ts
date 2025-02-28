import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { PaymentFindManyData, PaymentFindOneData, PaymentFindOneResponse, PaymentModifyResposne } from '../interfaces'
import { GlobalModifyResponseDto, GlobalResponseDto, PaginationResponseDto } from '@common'
import { PaymentRequiredDto } from './fields.dtos'

export class PaymentFindOneDataDto extends PickType(PaymentRequiredDto, ['id', 'createdAt', 'card', 'cash', 'clientId', 'description', 'other']) implements PaymentFindOneData {}

export class PaymentFindManyDataDto extends PaginationResponseDto implements PaymentFindManyData {
	@ApiProperty({ type: PaymentFindOneDataDto, isArray: true })
	data: PaymentFindOneData[]
}

export class PaymentFindManyResponseDto extends GlobalResponseDto implements PaymentFindManyResponseDto {
	@ApiProperty({ type: PaymentFindManyDataDto })
	data: PaymentFindManyData | PaymentFindOneData[]
}

export class PaymentFindOneResponseDto extends GlobalResponseDto implements PaymentFindOneResponse {
	@ApiProperty({ type: PaymentFindOneDataDto })
	data: PaymentFindOneData
}

export class PaymentModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) implements PaymentModifyResposne {}
