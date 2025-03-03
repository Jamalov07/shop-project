import { PickType, IntersectionType } from '@nestjs/swagger'
import { PaymentCreateOneRequest, PaymentFindManyRequest, PaymentFindOneRequest, PaymentUpdateOneRequest } from '../interfaces'
import { PaginationRequestDto } from '@common'
import { PaymentOptionalDto, PaymentRequiredDto } from './fields.dtos'

export class PaymentFindManyRequestDto
	extends IntersectionType(PickType(PaymentOptionalDto, ['clientId', 'description']), PaginationRequestDto)
	implements PaymentFindManyRequest {}

export class PaymentFindOneRequestDto extends IntersectionType(PickType(PaymentRequiredDto, ['id'])) implements PaymentFindOneRequest {}

export class PaymentCreateOneRequestDto
	extends IntersectionType(PickType(PaymentRequiredDto, ['clientId', 'staffId']), PickType(PaymentOptionalDto, ['card', 'cash', 'description', 'other']))
	implements PaymentCreateOneRequest {}

export class PaymentUpdateOneRequestDto extends IntersectionType(PickType(PaymentOptionalDto, ['description'])) implements PaymentUpdateOneRequest {}
