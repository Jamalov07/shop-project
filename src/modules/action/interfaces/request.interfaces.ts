import { PaginationRequest, RequestOtherFields } from '../../../common'
import { ActionOptional } from './fields.interfaces'

export declare interface ActionFindManyRequest extends Pick<ActionOptional, 'name' | 'url' | 'method' | 'description'>, PaginationRequest, Pick<RequestOtherFields, 'ids'> {}

export declare interface ActionFindOneRequest extends Pick<ActionOptional, 'id' | 'description' | 'name' | 'method' | 'url'> {}

export declare interface ActionGetManyRequest extends Pick<ActionOptional, 'name' | 'url' | 'method' | 'description'>, PaginationRequest, Pick<RequestOtherFields, 'ids'> {}

export declare interface ActionGetOneRequest extends Pick<ActionOptional, 'id' | 'description' | 'name' | 'method' | 'url'> {}

export declare interface ActionUpdateOneRequest extends Pick<ActionOptional, 'description'> {}
