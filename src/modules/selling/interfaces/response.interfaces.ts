import { GlobalResponse, PaginationResponse } from '@common'
import { SellingRequired } from './fields.interfaces'

export declare interface SellingFindManyData extends PaginationResponse<SellingFindOneData> {}

export declare interface SellingFindOneData extends Pick<SellingRequired, 'id' | 'createdAt' | 'clientId' | 'paymentCompleted' | 'staffId' | 'status' | 'totalSum'> {}

export declare interface SellingFindManyResponse extends GlobalResponse {
	data: SellingFindManyData | SellingFindOneData[]
}

export declare interface SellingFindOneResponse extends GlobalResponse {
	data: SellingFindOneData
}

export declare interface SellingModifyResposne extends GlobalResponse {
	data: null
}
