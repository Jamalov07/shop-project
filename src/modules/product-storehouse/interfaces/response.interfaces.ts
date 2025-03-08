import { GlobalResponse, PaginationResponse } from '@common'
import { ProductStorehouseRequired } from './fields.interfaces'
import { StorehouseFindOneData } from '../../storehouse'
import { ProductFindOneData } from '../../product'

export declare interface ProductStorehouseFindManyData extends PaginationResponse<ProductStorehouseFindOneData> {}

export declare interface ProductStorehouseFindOneData extends Pick<ProductStorehouseRequired, 'id' | 'createdAt' | 'quantity'> {
	product?: ProductFindOneData
	storehouse?: StorehouseFindOneData
}

export declare interface ProductStorehouseFindManyResponse extends GlobalResponse {
	data: ProductStorehouseFindManyData | { data: ProductStorehouseFindOneData[] }
}

export declare interface ProductStorehouseFindOneResponse extends GlobalResponse {
	data: ProductStorehouseFindOneData
}

export declare interface ProductStorehouseModifyResposne extends GlobalResponse {
	data: null
}
