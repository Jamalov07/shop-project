import { PaginationRequest, RequestOtherFields } from '@common'
import { StorehouseOptional, StorehouseProductOptional, StorehouseProductRequired, StorehouseRequired } from './fields.interfaces'

export declare interface StorehouseFindManyRequest extends Pick<StorehouseOptional, 'name' | 'hexColor'>, PaginationRequest, Pick<RequestOtherFields, 'ids'> {}

export declare interface StorehouseFindOneRequest extends Pick<StorehouseOptional, 'id' | 'name' | 'hexColor'> {}

export declare interface StorehouseGetManyRequest extends Pick<StorehouseOptional, 'name' | 'hexColor' | 'position'>, PaginationRequest, Pick<RequestOtherFields, 'ids'> {}

export declare interface StorehouseGetOneRequest extends Pick<StorehouseOptional, 'id' | 'name' | 'hexColor' | 'position'> {}

export declare interface StorehouseCreateOneRequest extends Pick<StorehouseRequired, 'name' | 'hexColor'> {}

export declare interface StorehouseUpdateOneRequest extends Pick<StorehouseOptional, 'name' | 'hexColor'> {}

export declare interface StorehouseDeleteOneRequest extends Pick<StorehouseOptional, 'id'> {}

//================

export declare interface StorehouseProductGetOneRequest extends Pick<StorehouseProductOptional, 'id' | 'productId' | 'storehouseId' | 'quantity'> {}

export declare interface StorehouseProductCreateOneRequest extends Pick<StorehouseProductRequired, 'productId' | 'storehouseId' | 'quantity'> {}

export declare interface StorehouseProductUpdateOneRequest extends Pick<StorehouseProductOptional, 'productId' | 'storehouseId' | 'quantity'> {}

export declare interface StorehouseProduct extends Pick<StorehouseProductRequired, 'id' | 'quantity'> {}

export declare interface StorehouseProductCreateManyRequest extends Pick<StorehouseProductRequired, 'storehouseId'> {
	products: StorehouseProduct[]
}

export declare interface StorehouseProductDeleteManyRequest extends Pick<RequestOtherFields, 'ids'> {}

export declare interface StorehouseProductDeleteOneRequest extends Pick<StorehouseProductRequired, 'id'> {}
