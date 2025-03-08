import { PickType, IntersectionType, ApiPropertyOptional } from '@nestjs/swagger'
import { PaymentCreateOneRequest, PaymentFindManyRequest, PaymentFindOneRequest, PaymentUpdateOneRequest } from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '@common'
import { PaymentOptionalDto, PaymentRequiredDto } from './fields.dtos'

export class PaymentFindManyRequestDto
	extends IntersectionType(PickType(PaymentOptionalDto, ['clientId', 'description']), PaginationRequestDto, PickType(RequestOtherFieldsDto, ['startDate', 'endDate']))
	implements PaymentFindManyRequest
{
	@ApiPropertyOptional({ type: String })
	clientFullName?: string
}

export class PaymentFindOneRequestDto extends IntersectionType(PickType(PaymentRequiredDto, ['id'])) implements PaymentFindOneRequest {}

export class PaymentCreateOneRequestDto
	extends IntersectionType(PickType(PaymentRequiredDto, ['clientId']), PickType(PaymentOptionalDto, ['card', 'cash', 'description', 'other']))
	implements PaymentCreateOneRequest {}

export class PaymentUpdateOneRequestDto extends IntersectionType(PickType(PaymentOptionalDto, ['description'])) implements PaymentUpdateOneRequest {}
