import { GlobalResponse, PaginationResponse } from '@common'
import { StorehouseRequired } from './fields.interfaces'
import { ProductStorehouse } from '../../product-storehouse'
import { ProductFindOneData } from '../../product'

export declare interface StorehouseFindManyData extends PaginationResponse<StorehouseFindOneData> {}

export declare interface StorehouseProduct extends ProductStorehouse {
	product: ProductFindOneData
}
export declare interface StorehouseFindOneData extends Pick<StorehouseRequired, 'id' | 'name' | 'hexColor' | 'position' | 'createdAt'> {
	products?: StorehouseProduct[]
	totalPackagesCount?: number
	totalPackagesCost?: bigint
	totalPackagesPrice?: bigint
}

export declare interface StorehouseFindManyResponse extends GlobalResponse {
	data: StorehouseFindManyData | { data: StorehouseFindOneData[] }
}

export declare interface StorehouseFindOneResponse extends GlobalResponse {
	data: StorehouseFindOneData
}

export declare interface StorehouseModifyResposne extends GlobalResponse {
	data: null
}
