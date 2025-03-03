import { PickType, IntersectionType, ApiProperty } from '@nestjs/swagger'
import { SellingCreateOneRequest, SellingDeleteOneRequest, SellingFindManyRequest, SellingFindOneRequest, SellingUpdateOneRequest } from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '@common'
import { SellingOptionalDto, SellingRequiredDto } from './fields.dtos'
import { PaymentCreateOneRequest, PaymentCreateOneRequestDto } from '../../payment'

export class SellingFindManyRequestDto
	extends IntersectionType(PickType(SellingOptionalDto, ['clientId', 'staffId', 'paymentCompleted', 'status']), PaginationRequestDto)
	implements SellingFindManyRequest {}

export class SellingFindOneRequestDto extends IntersectionType(PickType(SellingRequiredDto, ['id'])) implements SellingFindOneRequest {}

export class SellingCreateOneRequestDto extends IntersectionType(PickType(SellingRequiredDto, ['clientId', 'staffId', 'totalSum'])) implements SellingCreateOneRequest {}

export class SellingCreateOneWithPaymentRequestDto extends IntersectionType(PickType(SellingRequiredDto, ['clientId', 'staffId', 'totalSum'])) implements SellingCreateOneRequest {
	@ApiProperty({ type: PickType(PaymentCreateOneRequestDto, ['card', 'cash', 'description', 'other']) })
	payment?: Pick<PaymentCreateOneRequest, 'card' | 'cash' | 'description' | 'other'>
}

export class SellingUpdateOneRequestDto extends IntersectionType(PickType(SellingOptionalDto, ['status', 'paymentCompleted', 'totalSum'])) implements SellingUpdateOneRequest {}

export class SellingDeleteOneRequestDto extends IntersectionType(PickType(SellingRequiredDto, ['id'])) implements SellingDeleteOneRequest {}
