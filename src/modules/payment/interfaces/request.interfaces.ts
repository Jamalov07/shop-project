import { PaginationRequest, RequestOtherFields } from '../../../common'
import { PaymentOptional, PaymentRequired } from './fields.interfaces'

export declare interface PaymentFindManyRequest
	extends Pick<PaymentOptional, 'clientId' | 'description' | 'staffId' | 'sellingId'>,
		PaginationRequest,
		Pick<RequestOtherFields, 'ids' | 'startDate' | 'endDate'> {
	clientFullName?: string
}

export declare interface PaymentFindOneRequest extends Pick<PaymentRequired, 'id'> {}

export declare interface PaymentGetManyRequest
	extends Pick<PaymentOptional, 'clientId' | 'description' | 'other' | 'card' | 'cash' | 'staffId' | 'sellingId'>,
		PaginationRequest,
		Pick<RequestOtherFields, 'ids'> {}

export declare interface PaymentGetOneRequest extends Pick<PaymentOptional, 'id' | 'clientId' | 'description' | 'other' | 'card' | 'cash' | 'sellingId'> {}

export declare interface PaymentCreateOneRequest extends Pick<PaymentOptional, 'sellingId' | 'description' | 'other' | 'card' | 'cash' | 'staffId' | 'clientId'> {}

export declare interface PaymentUpdateOneRequest extends Pick<PaymentOptional, 'description'> {}

export declare interface PaymentDeleteOneRequest extends Pick<PaymentOptional, 'id'> {}
