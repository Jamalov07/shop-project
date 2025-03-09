import { PickType, IntersectionType, ApiProperty } from '@nestjs/swagger'
import { SellingCreateOneRequest, SellingDeleteOneRequest, SellingFindManyRequest, SellingFindOneRequest, SellingUpdateOneRequest } from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '@common'
import { SellingOptionalDto, SellingRequiredDto } from './fields.dtos'
import { PaymentCreateOneRequest, PaymentCreateOneRequestDto } from '../../payment'
import { ProductStorehouse, ProductStorehouseDto } from '../../product-storehouse'
import { ArrayNotEmpty } from 'class-validator'
import { Type } from 'class-transformer'

export class SellingFindManyRequestDto
	extends IntersectionType(PickType(SellingOptionalDto, ['clientId', 'staffId', 'status']), PaginationRequestDto, PickType(RequestOtherFieldsDto, ['endDate', 'startDate', 'ids']))
	implements SellingFindManyRequest {}

export class SellingFindOneRequestDto extends IntersectionType(PickType(SellingRequiredDto, ['id'])) implements SellingFindOneRequest {}

export class SellingCreateOneRequestDto extends IntersectionType(PickType(SellingRequiredDto, ['clientId', 'totalSum'])) implements SellingCreateOneRequest {
	@ApiProperty({ type: ProductStorehouseDto, isArray: true })
	@ArrayNotEmpty()
	@Type(() => ProductStorehouseDto)
	products: ProductStorehouse[]

	@ApiProperty({ type: PickType(PaymentCreateOneRequestDto, ['card', 'cash', 'description', 'other']) })
	payment?: Pick<PaymentCreateOneRequest, 'card' | 'cash' | 'description' | 'other'>
}

// export class SellingCreateOneWithPaymentRequestDto extends IntersectionType(PickType(SellingRequiredDto, ['clientId', 'totalSum'])) implements SellingCreateOneRequest {
// 	@ApiProperty({ type: PickType(PaymentCreateOneRequestDto, ['card', 'cash', 'description', 'other']) })
// 	payment?: Pick<PaymentCreateOneRequest, 'card' | 'cash' | 'description' | 'other'>
// }

export class SellingUpdateOneRequestDto extends IntersectionType(PickType(SellingOptionalDto, ['status', 'totalSum'])) implements SellingUpdateOneRequest {}

export class SellingDeleteOneRequestDto extends IntersectionType(PickType(SellingRequiredDto, ['id'])) implements SellingDeleteOneRequest {}
