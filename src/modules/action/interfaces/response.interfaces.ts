import { GlobalResponse, PaginationResponse } from '../../../common'
import { ActionRequired } from './fields.interfaces'

export declare interface ActionFindManyData extends PaginationResponse<ActionFindOneData> {}

export declare interface ActionFindOneData extends Pick<ActionRequired, 'id' | 'name' | 'url' | 'method' | 'description'> {}

export declare interface ActionFindManyResponse extends GlobalResponse {
	data: ActionFindManyData | { data: ActionFindOneData[] }
}

export declare interface ActionFindOneResponse extends GlobalResponse {
	data: ActionFindOneData
}

export declare interface ActionModifyResposne extends GlobalResponse {
	data: null
}
