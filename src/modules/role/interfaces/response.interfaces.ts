import { GlobalResponse, PaginationResponse } from '@common'
import { RoleRequired } from './fields.interfaces'
import { ActionFindOneData } from '../../action/interfaces'

export declare interface RoleFindManyData extends PaginationResponse<RoleFindOneData> {}

export declare interface RoleFindOneData extends Pick<RoleRequired, 'id' | 'name' | 'createdAt'> {
	actions?: ActionFindOneData[]
}

export declare interface RoleFindManyResponse extends GlobalResponse {
	data: RoleFindManyData | { data: RoleFindOneData[] }
}

export declare interface RoleFindOneResponse extends GlobalResponse {
	data: RoleFindOneData
}

export declare interface RoleModifyResposne extends GlobalResponse {
	data: null
}
