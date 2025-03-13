import { GlobalResponse, PaginationResponse } from '@common'
import { SellingRequired } from './fields.interfaces'
import { ClientFindOneData } from '../../client'
import { PaymentFindOneData } from '../../payment'
import { StaffFindOneData } from '../../staff'
import { SellingProductModel } from '@prisma/client'
import { StorehouseFindOneData } from '../../storehouse'
import { ProductFindOneData } from '../../product'

export declare interface SellingFindManyData extends PaginationResponse<SellingFindOneData> {}

export declare interface SellingProductProductStorehouse {
	storehouse: StorehouseFindOneData
	product: ProductFindOneData
}
export declare interface SellingProduct extends Pick<SellingProductModel, 'quantity'> {
	productStorehouse: SellingProductProductStorehouse
}
export declare interface SellingFindOneData extends Pick<SellingRequired, 'id' | 'createdAt' | 'totalSum'> {
	client?: ClientFindOneData
	payments?: PaymentFindOneData[]
	staff?: StaffFindOneData
	products?: SellingProduct[]
	debt?: bigint
}

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
	ourDebt: bigint
	theirDebt: bigint
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
