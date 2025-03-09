import { GlobalResponse, PaginationResponse } from '@common'
import { ProductRequired } from './fields.interfaces'
import { ProductStorehouseFindOneData } from '../../product-storehouse'

export declare interface PCalc {
	totalPackages: number
	totalQuantityInPackages: number
	totalCost: bigint
	totalPrice: bigint
}
export declare interface ProductCalc {
	inPage: PCalc
	inTotal: PCalc
}
export declare interface ProductFindManyData extends PaginationResponse<ProductFindOneData> {
	calc: ProductCalc
}

export declare interface ProductFindOneData extends Pick<ProductRequired, 'id' | 'name' | 'cost' | 'price' | 'quantity' | 'warningThreshold' | 'createdAt' | 'image'> {
	countInStorehouses?: number
}

export declare interface ProductFindManyResponse extends GlobalResponse {
	data: ProductFindManyData | { data: ProductFindOneData[] }
}

export declare interface ProductFindOneResponse extends GlobalResponse {
	data: ProductFindOneData
}

export declare interface ProductFindOneForSellingResponse extends GlobalResponse {
	data: ProductFindOneData & { storehouses: ProductStorehouseFindOneData[] }
}

export declare interface ProductModifyResposne extends GlobalResponse {
	data: null
}
