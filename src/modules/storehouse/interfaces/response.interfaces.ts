import { GlobalResponse, PaginationResponse } from '@common'
import { StorehouseRequired } from './fields.interfaces'

export declare interface StorehouseFindManyData extends PaginationResponse<StorehouseFindOneData> {}

export declare interface StorehouseFindOneData extends Pick<StorehouseRequired, 'id' | 'name' | 'hexColor' | 'position' | 'createdAt'> {}

export declare interface StorehouseFindManyResponse extends GlobalResponse {
	data: StorehouseFindManyData | StorehouseFindOneData[]
}

export declare interface StorehouseFindOneResponse extends GlobalResponse {
	data: StorehouseFindOneData
}

export declare interface StorehouseModifyResposne extends GlobalResponse {
	data: null
}
