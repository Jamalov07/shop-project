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
	extends Pick<PaymentOptional, 'clientId' | 'description' | 'other' | 'staffId' | 'sellingId'>,
		PaginationRequest,
		Pick<RequestOtherFields, 'ids'> {}

export declare interface PaymentGetOneRequest extends Pick<PaymentOptional, 'id' | 'clientId' | 'description' | 'other' | 'sellingId'> {}

export declare interface PaymentCreateOneRequest extends Pick<PaymentRequired, 'clientId'>, Pick<PaymentOptional, 'sellingId' | 'description' | 'other' | 'staffId'> {}

export declare interface PaymentUpdateOneRequest extends Pick<PaymentOptional, 'description'> {}
