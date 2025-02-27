import { PaginationRequest, RequestOtherFields } from '@common'
import { StorehouseOptional, StorehouseRequired } from './fields.interfaces'

export declare interface StorehouseFindManyRequest extends Pick<StorehouseOptional, 'name' | 'hexColor'>, PaginationRequest, Pick<RequestOtherFields, 'ids'> {}

export declare interface StorehouseFindOneRequest extends Pick<StorehouseOptional, 'id' | 'name' | 'hexColor'> {}

export declare interface StorehouseGetManyRequest extends Pick<StorehouseOptional, 'name' | 'hexColor' | 'position'>, PaginationRequest, Pick<RequestOtherFields, 'ids'> {}

export declare interface StorehouseGetOneRequest extends Pick<StorehouseOptional, 'id' | 'name' | 'hexColor' | 'position'> {}

export declare interface StorehouseCreateOneRequest extends Pick<StorehouseRequired, 'name' | 'hexColor'> {}

export declare interface StorehouseUpdateOneRequest extends Pick<StorehouseOptional, 'name' | 'hexColor'> {}

export declare interface StorehouseDeleteOneRequest extends Pick<StorehouseOptional, 'id'> {}
