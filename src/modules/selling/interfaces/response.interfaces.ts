import { GlobalResponse, PaginationResponse } from '@common'
import { SellingRequired } from './fields.interfaces'

export declare interface SellingFindManyData extends PaginationResponse<SellingFindOneData> {}

export declare interface SellingFindOneData extends Pick<SellingRequired, 'id' | 'createdAt' | 'totalSum'> {}

export declare interface SellingFindManyResponse extends GlobalResponse {
	data: SellingFindManyData | { data: SellingFindOneData[] }
}

export declare interface SellingFindOneResponse extends GlobalResponse {
	data: SellingFindOneData
}

export declare interface SellingModifyResposne extends GlobalResponse {
	data: null
}
