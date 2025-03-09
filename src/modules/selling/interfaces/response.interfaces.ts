import { GlobalResponse, PaginationResponse } from '@common'
import { SellingRequired } from './fields.interfaces'

export declare interface SellingFindManyData extends PaginationResponse<SellingFindOneData> {}

export declare interface SellingFindOneData extends Pick<SellingRequired, 'id' | 'createdAt' | 'totalSum'> {}

export declare interface SellingFindManyResponse extends GlobalResponse {
	data: SellingFindManyData | { data: SellingFindOneData[] }
}

export declare interface SellingFindOneResponse extends GlobalResponse {
	data: SellingFindOneData
}

export declare interface SellingGetTotalStatsData {
	daily: bigint
	weekly: bigint
	monthly: bigint
	yearly: bigint
}
export declare interface SellingGetTotalStatsResponse extends GlobalResponse {
	data: SellingGetTotalStatsData
}

export declare interface SellingGetPeriodStatsData {
	date: string
	sum: bigint
}

export declare interface SellingGetPeriodStatsResponse extends GlobalResponse {
	data: SellingGetPeriodStatsData[]
}

export declare interface SellingModifyResposne extends GlobalResponse {
	data: null
}
