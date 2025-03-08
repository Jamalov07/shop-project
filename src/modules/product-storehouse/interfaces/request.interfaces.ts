import { PaginationRequest, RequestOtherFields } from '../../../common'
import { ProductStorehouseOptional, ProductStorehouseRequired } from './fields.interfaces'

export declare interface ProductStorehouseFindManyRequest
	extends Pick<ProductStorehouseOptional, 'productId' | 'storehouseId' | 'quantity'>,
		PaginationRequest,
		Pick<RequestOtherFields, 'ids'> {
	minQuantity?: number
	maxQuantity?: number
}

export declare interface ProductStorehouseGetOneRequest extends Pick<ProductStorehouseOptional, 'id' | 'productId' | 'storehouseId' | 'quantity'> {}

export declare interface ProductStorehouseCreateOneRequest extends Pick<ProductStorehouseRequired, 'productId' | 'storehouseId' | 'quantity'> {}

export declare interface ProductStorehouseUpdateOneRequest extends Pick<ProductStorehouseOptional, 'productId' | 'storehouseId' | 'quantity'> {}

export declare interface ProductStorehouse extends Pick<ProductStorehouseRequired, 'id' | 'quantity'> {}

export declare interface ProductStorehouseCreateManyRequest extends Pick<ProductStorehouseRequired, 'storehouseId'> {
	products: ProductStorehouse[]
}

export declare interface ProductStorehouseDeleteManyRequest extends Pick<RequestOtherFields, 'ids'> {}

export declare interface ProductStorehouseDeleteOneRequest extends Pick<ProductStorehouseRequired, 'id'> {}

export declare interface ProductStorehouseTransferManyRequest {
	fromStorehouseId: string
	toStorehouseId: string
	products: ProductStorehouse[]
}
