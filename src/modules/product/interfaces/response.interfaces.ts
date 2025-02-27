import { GlobalResponse, PaginationResponse } from '@common'
import { ProductRequired } from './fields.interfaces'

export declare interface ProductFindManyData extends PaginationResponse<ProductFindOneData> {}

export declare interface ProductFindOneData extends Pick<ProductRequired, 'id' | 'name' | 'cost' | 'price' | 'quantity' | 'warningThreshold' | 'createdAt'> {}

export declare interface ProductFindManyResponse extends GlobalResponse {
	data: ProductFindManyData | ProductFindOneData[]
}

export declare interface ProductFindOneResponse extends GlobalResponse {
	data: ProductFindOneData
}

export declare interface ProductModifyResposne extends GlobalResponse {
	data: null
}
