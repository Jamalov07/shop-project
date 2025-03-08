import { GlobalResponse, PaginationResponse } from '@common'
import { PaymentRequired } from './fields.interfaces'

export declare interface Calc {
	cash: bigint
	card: bigint
	other: bigint
}
export declare interface PaymentCalc {
	inPage: Calc
	inTotal: Calc
}

export declare interface PaymentFindManyData extends PaginationResponse<PaymentFindOneData> {
	calc: PaymentCalc
}

export declare interface PaymentFindOneData extends Pick<PaymentRequired, 'id' | 'createdAt' | 'card' | 'cash' | 'clientId' | 'description' | 'other'> {}

export declare interface PaymentFindManyResponse extends GlobalResponse {
	data: PaymentFindManyData | { data: PaymentFindOneData[] }
}

export declare interface PaymentFindOneResponse extends GlobalResponse {
	data: PaymentFindOneData
}

export declare interface PaymentModifyResposne extends GlobalResponse {
	data: null
}
