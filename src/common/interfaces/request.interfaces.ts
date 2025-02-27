import { Request } from 'express'
import { DeleteMethodEnum } from '../enums'

export declare interface RequestOtherFields {
	ids?: string[]
	method?: DeleteMethodEnum
	isDeleted?: boolean
	rolesToConnect?: string[]
	rolesToDisconnect?: string[]
	actionsToConnect?: string[]
	actionsToDisconnect?: string[]
}

export declare interface CRequest extends Request {
	staff?: { id: string; token?: string }
}
