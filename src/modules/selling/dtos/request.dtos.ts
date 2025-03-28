import { PickType, IntersectionType, ApiProperty } from '@nestjs/swagger'
import {
	PaymentWithoutSellingId,
	SellingCreateOneRequest,
	SellingDeleteOneRequest,
	SellingFindManyRequest,
	SellingFindOneRequest,
	SellingGetPeriodStatsRequest,
	SellingGetTotalStatsRequest,
	SellingUpdateOneRequest,
} from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '@common'
import { SellingOptionalDto, SellingRequiredDto } from './fields.dtos'
import { PaymentCreateOneRequest, PaymentCreateOneRequestDto } from '../../payment'
import { ProductStorehouse, ProductStorehouseDto } from '../../product-storehouse'
import { ArrayNotEmpty, IsEnum, IsNotEmpty, IsObject, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'
import { StatsTypeEnum } from '../enums'

export class SellingFindManyRequestDto
	extends IntersectionType(PickType(SellingOptionalDto, ['clientId', 'staffId', 'status']), PaginationRequestDto, PickType(RequestOtherFieldsDto, ['endDate', 'startDate']))
	implements SellingFindManyRequest {}

export class SellingFindOneRequestDto extends IntersectionType(PickType(SellingRequiredDto, ['id'])) implements SellingFindOneRequest {}

export class PaymentWithoutSellingIdDto extends PickType(PaymentCreateOneRequestDto, ['description', 'other',"card","cash"]) implements PaymentWithoutSellingId {}
export class SellingCreateOneRequestDto
	extends IntersectionType(PickType(SellingRequiredDto, ['totalSum']), PickType(SellingOptionalDto, ['clientId']))
	implements SellingCreateOneRequest
{
	@ApiProperty({ type: ProductStorehouseDto, isArray: true })
	@ArrayNotEmpty()
	@Type(() => ProductStorehouseDto)
	products: ProductStorehouse[]

	@ApiProperty({ type: PaymentWithoutSellingIdDto })
	@IsOptional()
	@IsObject()
	@Type(() => PaymentWithoutSellingIdDto)
	payment?: PaymentWithoutSellingId
}

// export class SellingCreateOneWithPaymentRequestDto extends IntersectionType(PickType(SellingRequiredDto, ['clientId', 'totalSum'])) implements SellingCreateOneRequest {
// 	@ApiProperty({ type: PickType(PaymentCreateOneRequestDto, [ 'description', 'other']) })
// 	payment?: Pick<PaymentCreateOneRequest, 'description' | 'other'>
// }

export class SellingUpdateOneRequestDto extends IntersectionType(PickType(SellingOptionalDto, ['status', 'totalSum'])) implements SellingUpdateOneRequest {}

export class SellingDeleteOneRequestDto extends IntersectionType(PickType(SellingRequiredDto, ['id'])) implements SellingDeleteOneRequest {}

export class SellingGetTotalStatsRequestDto implements SellingGetTotalStatsRequest {}

export class SellingGetPeriodStatsRequestDto implements SellingGetPeriodStatsRequest {
	@ApiProperty({ enum: StatsTypeEnum })
	@IsOptional()
	@IsEnum(StatsTypeEnum)
	type?: StatsTypeEnum = StatsTypeEnum.day
}
