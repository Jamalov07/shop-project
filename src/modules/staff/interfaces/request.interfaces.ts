import { PaginationRequest, RequestOtherFields } from '@common'
import { StaffOptional, StaffRequired } from './fields.interfaces'

//query
export declare interface StaffFindManyRequest extends Pick<StaffOptional, 'phone' | 'fullname'>, PaginationRequest, Pick<RequestOtherFields, 'ids' | 'isDeleted'> {}

//query
export declare interface StaffFindOneRequest extends Pick<StaffOptional, 'id' | 'phone' | 'fullname' | 'token'>, Pick<RequestOtherFields, 'isDeleted'> {}

//query
export declare interface StaffGetManyRequest extends Pick<StaffOptional, 'phone' | 'fullname'>, PaginationRequest, Pick<RequestOtherFields, 'ids' | 'isDeleted'> {}

//query
export declare interface StaffGetOneRequest extends Pick<StaffOptional, 'id' | 'phone' | 'fullname' | 'token'>, Pick<RequestOtherFields, 'isDeleted'> {}

//body
export declare interface StaffCreateOneRequest
	extends Pick<StaffRequired, 'phone' | 'password'>,
		Pick<StaffOptional, 'fullname'>,
		Pick<RequestOtherFields, 'rolesToConnect' | 'actionsToConnect'> {}

//body
export declare interface StaffCreateManyRequest {
	datas: StaffCreateOneRequest[]
}

//body
export declare interface StaffUpdateOneRequest
	extends Pick<StaffOptional, 'phone' | 'fullname' | 'deletedAt' | 'password' | 'token'>,
		Pick<RequestOtherFields, 'rolesToConnect' | 'rolesToDisconnect' | 'actionsToConnect' | 'actionsToDisconnect'> {}

//body
export declare interface StaffUpdateManyRequest extends Pick<StaffOptional, 'deletedAt'>, Pick<RequestOtherFields, 'ids'> {}

//query
export declare interface StaffDeleteOneRequest extends Pick<StaffRequired, 'id'>, Pick<RequestOtherFields, 'method'> {}

//query
export declare interface StaffDeleteManyRequest extends Pick<RequestOtherFields, 'ids' | 'method'> {}
