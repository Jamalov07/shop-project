import { PaginationRequest, RequestOtherFields } from '@common'
import { ProductOptional, ProductRequired } from './fields.interfaces'

export declare interface ProductFindManyRequest extends Pick<ProductOptional, 'name'>, PaginationRequest, Pick<RequestOtherFields, 'ids'> {}

export declare interface ProductFindOneRequest extends Pick<ProductOptional, 'id' | 'name'> {}
export declare interface ProductFindOneforSellingRequest extends Pick<ProductRequired, 'id'> {
	minQuantity: number
}

export declare interface ProductGetManyRequest extends Pick<ProductOptional, 'name' | 'cost' | 'price' | 'quantity'>, PaginationRequest, Pick<RequestOtherFields, 'ids'> {}

export declare interface ProductGetOneRequest extends Pick<ProductOptional, 'id' | 'name' | 'cost' | 'price' | 'quantity' | 'warningThreshold'> {}

export declare interface ProductCreateOneRequest extends Pick<ProductRequired, 'name' | 'cost' | 'price' | 'quantity' | 'warningThreshold'>, Pick<ProductOptional, 'image'> {}

export declare interface ProductUpdateOneRequest extends Pick<ProductOptional, 'name' | 'cost' | 'price' | 'quantity' | 'warningThreshold'>, Pick<ProductOptional, 'image'> {}

export declare interface ProductDeleteOneRequest extends Pick<ProductOptional, 'id'> {}
