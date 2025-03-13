import { PickType, IntersectionType, ApiPropertyOptional } from '@nestjs/swagger'
import { PaymentCreateOneRequest, PaymentDeleteOneRequest, PaymentFindManyRequest, PaymentFindOneRequest, PaymentUpdateOneRequest } from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '@common'
import { PaymentOptionalDto, PaymentRequiredDto } from './fields.dtos'

export class PaymentFindManyRequestDto
	extends IntersectionType(
		PickType(PaymentOptionalDto, ['clientId', 'description', 'sellingId', 'staffId']),
		PaginationRequestDto,
		PickType(RequestOtherFieldsDto, ['startDate', 'endDate']),
	)
	implements PaymentFindManyRequest
{
	@ApiPropertyOptional({ type: String })
	clientFullName?: string
}

export class PaymentFindOneRequestDto extends IntersectionType(PickType(PaymentRequiredDto, ['id'])) implements PaymentFindOneRequest {}

export class PaymentCreateOneRequestDto
	extends IntersectionType(PickType(PaymentRequiredDto, ['clientId']), PickType(PaymentOptionalDto, ['description', 'other', 'card', 'cash', 'sellingId']))
	implements PaymentCreateOneRequest {}

export class PaymentUpdateOneRequestDto extends IntersectionType(PickType(PaymentOptionalDto, ['description'])) implements PaymentUpdateOneRequest {}

export class PaymentDeleteOneRequestDto extends IntersectionType(PickType(PaymentRequiredDto, ['id'])) implements PaymentDeleteOneRequest {}
