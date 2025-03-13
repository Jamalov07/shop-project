import { PaginationRequest, RequestOtherFields } from '@common'
import { SellingOptional, SellingRequired } from './fields.interfaces'
import { PaymentCreateOneRequest } from '../../payment'
import { ProductStorehouse } from '../../product-storehouse'
import { StatsTypeEnum } from '../enums'

export declare interface SellingFindManyRequest
	extends Pick<SellingOptional, 'clientId' | 'staffId' | 'status'>,
		PaginationRequest,
		Pick<RequestOtherFields, 'ids' | 'endDate' | 'startDate'> {}

export declare interface SellingFindOneRequest extends Pick<SellingOptional, 'id'> {}

export declare interface SellingGetManyRequest
	extends Pick<SellingOptional, 'clientId' | 'staffId' | 'status'>,
		PaginationRequest,
		Pick<RequestOtherFields, 'ids' | 'endDate' | 'startDate'> {}

export declare interface SellingGetOneRequest extends Pick<SellingOptional, 'id'> {}

export declare interface PaymentWithoutSellingId extends Pick<PaymentCreateOneRequest, 'description' | 'other' | 'card' | 'cash'> {}
export declare interface SellingCreateOneRequest extends Pick<SellingRequired, 'totalSum'>, Pick<SellingOptional, 'clientId' | 'staffId'> {
	payment?: PaymentWithoutSellingId
	products: ProductStorehouse[]
}

export declare interface SellingUpdateOneRequest extends Pick<SellingOptional, 'status' | 'totalSum'> {}

export declare interface SellingDeleteOneRequest extends Pick<SellingOptional, 'id'> {}

export declare interface SellingGetTotalStatsRequest {}

export declare interface SellingGetPeriodStatsRequest {
	type?: StatsTypeEnum
}
