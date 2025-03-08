import { PaginationRequest, RequestOtherFields } from '@common'
import { SellingOptional, SellingRequired } from './fields.interfaces'
import { PaymentCreateOneRequest } from '../../payment'
import { ProductStorehouse } from '../../product-storehouse'

export declare interface SellingFindManyRequest
	extends Pick<SellingOptional, 'clientId' | 'staffId' | 'status'>,
		PaginationRequest,
		Pick<RequestOtherFields, 'ids' | 'endDate' | 'startDate'> {}

export declare interface SellingFindOneRequest extends Pick<SellingOptional, 'id'> {}

export declare interface SellingGetManyRequest extends Pick<SellingOptional, 'clientId' | 'staffId' | 'status'>, PaginationRequest, Pick<RequestOtherFields, 'ids'> {}

export declare interface SellingGetOneRequest extends Pick<SellingOptional, 'id'> {}

export declare interface SellingCreateOneRequest extends Pick<SellingRequired, 'clientId' | 'totalSum'>, Pick<SellingOptional, 'staffId'> {
	payment?: Pick<PaymentCreateOneRequest, 'card' | 'cash' | 'description' | 'other'>
	products: ProductStorehouse[]
}

export declare interface SellingUpdateOneRequest extends Pick<SellingOptional, 'status' | 'totalSum'> {}

export declare interface SellingDeleteOneRequest extends Pick<SellingOptional, 'id'> {}
