import { GlobalResponse, PaginationResponse } from '@common'
import { PaymentRequired } from './fields.interfaces'

export declare interface PaymentFindManyData extends PaginationResponse<PaymentFindOneData> {}

export declare interface PaymentFindOneData extends Pick<PaymentRequired, 'id' | 'createdAt' | 'card' | 'cash' | 'clientId' | 'description' | 'other'> {}

export declare interface PaymentFindManyResponse extends GlobalResponse {
	data: PaymentFindManyData | PaymentFindOneData[]
}

export declare interface PaymentFindOneResponse extends GlobalResponse {
	data: PaymentFindOneData
}

export declare interface PaymentModifyResposne extends GlobalResponse {
	data: null
}
