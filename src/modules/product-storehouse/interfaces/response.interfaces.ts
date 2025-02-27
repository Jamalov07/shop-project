import { GlobalResponse, PaginationResponse } from '@common'
import { ProductStorehouseRequired } from './fields.interfaces'

export declare interface ProductStorehouseFindManyData extends PaginationResponse<ProductStorehouseFindOneData> {}

export declare interface ProductStorehouseFindOneData extends Pick<ProductStorehouseRequired, 'id' | 'createdAt' | 'productId' | 'quantity' | 'storehouseId'> {}

export declare interface ProductStorehouseFindManyResponse extends GlobalResponse {
	data: ProductStorehouseFindManyData | ProductStorehouseFindOneData[]
}

export declare interface ProductStorehouseFindOneResponse extends GlobalResponse {
	data: ProductStorehouseFindOneData
}

export declare interface ProductStorehouseModifyResposne extends GlobalResponse {
	data: null
}
