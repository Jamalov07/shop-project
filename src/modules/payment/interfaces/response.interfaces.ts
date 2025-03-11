import { GlobalResponse, PaginationResponse } from '@common'
import { PaymentRequired } from './fields.interfaces'
import { StaffFindOneData } from '../../staff'
import { ClientFindOneData } from '../../client'
import { SellingFindOneData } from '../../selling'

export declare interface Calc {
	other: bigint
}
export declare interface PaymentCalc {
	inPage: Calc
	inTotal: Calc
}

export declare interface PaymentFindManyData extends PaginationResponse<PaymentFindOneData> {
	calc: PaymentCalc
}

export declare interface PaymentFindOneData extends Pick<PaymentRequired, 'id' | 'createdAt' | 'description' | 'other'> {
	staff?: StaffFindOneData
	client?: ClientFindOneData
	selling?: SellingFindOneData
}

export declare interface PaymentFindManyResponse extends GlobalResponse {
	data: PaymentFindManyData | { data: PaymentFindOneData[] }
}

export declare interface PaymentFindOneResponse extends GlobalResponse {
	data: PaymentFindOneData
}

export declare interface PaymentModifyResposne extends GlobalResponse {
	data: null
}
