import { PaginationRequest, RequestOtherFields } from '../../../common'
import { ClientOptional, ClientRequired } from './fields.interfaces'

export declare interface ClientFindManyRequest extends Pick<ClientOptional, 'phone' | 'fullname'>, PaginationRequest, Pick<RequestOtherFields, 'ids'> {}

export declare interface ClientFindOneRequest extends Pick<ClientOptional, 'id' | 'phone' | 'fullname'> {}

export declare interface ClientGetManyRequest extends Pick<ClientOptional, 'phone' | 'fullname'>, PaginationRequest, Pick<RequestOtherFields, 'ids'> {}

export declare interface ClientGetOneRequest extends Pick<ClientOptional, 'id' | 'fullname' | 'phone'> {}

export declare interface ClientCreateOneRequest extends Pick<ClientRequired, 'phone' | 'fullname'> {}

export declare interface ClientUpdateOneRequest extends Pick<ClientOptional, 'phone' | 'fullname'> {}
