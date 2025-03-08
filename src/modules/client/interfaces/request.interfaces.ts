import { PaginationRequest, RequestOtherFields } from '../../../common'
import { ClientOptional, ClientRequired } from './fields.interfaces'

export declare interface ClientFindManyRequest extends Pick<ClientOptional, 'phone' | 'fullname'>, PaginationRequest, Pick<RequestOtherFields, 'ids' | 'search' | 'isDeleted'> {}

export declare interface ClientFindOneRequest extends Pick<ClientOptional, 'id' | 'phone' | 'fullname'>, Pick<RequestOtherFields, 'isDeleted'> {}

export declare interface ClientGetManyRequest extends Pick<ClientOptional, 'phone' | 'fullname'>, PaginationRequest, Pick<RequestOtherFields, 'ids' | 'isDeleted'> {}

export declare interface ClientGetOneRequest extends Pick<ClientOptional, 'id' | 'fullname' | 'phone'>, Pick<RequestOtherFields, 'isDeleted'> {}

export declare interface ClientCreateOneRequest extends Pick<ClientRequired, 'phone' | 'fullname'> {}

export declare interface ClientUpdateOneRequest extends Pick<ClientOptional, 'phone' | 'fullname' | 'deletedAt'> {}

//query
export declare interface ClientDeleteOneRequest extends Pick<ClientRequired, 'id'>, Pick<RequestOtherFields, 'method'> {}
