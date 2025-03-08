import { GlobalResponse, PaginationResponse } from '@common'
import { RoleRequired } from './fields.interfaces'

export declare interface RoleFindManyData extends PaginationResponse<RoleFindOneData> {}

export declare interface RoleFindOneData extends Pick<RoleRequired, 'id' | 'name' | 'createdAt'> {}

export declare interface RoleFindManyResponse extends GlobalResponse {
	data: RoleFindManyData | { data: RoleFindOneData[] }
}

export declare interface RoleFindOneResponse extends GlobalResponse {
	data: RoleFindOneData
}

export declare interface RoleModifyResposne extends GlobalResponse {
	data: null
}
