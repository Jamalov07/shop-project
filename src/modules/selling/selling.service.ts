import { BadRequestException, Injectable } from '@nestjs/common'
import { SellingRepository } from './selling.repository'
import { createResponse } from '@common'
import {
	SellingGetOneRequest,
	SellingCreateOneRequest,
	SellingUpdateOneRequest,
	SellingGetManyRequest,
	SellingFindManyRequest,
	SellingFindOneRequest,
	SellingGetTotalStatsRequest,
	SellingGetPeriodStatsRequest,
} from './interfaces'
import { PaymentRepository } from '../payment'
import { ProductStorehouseService } from '../product-storehouse'

@Injectable()
export class SellingService {
	private readonly sellingRepository: SellingRepository
	private readonly paymentRepository: PaymentRepository
	private readonly productStorehouseService: ProductStorehouseService

	constructor(sellingRepository: SellingRepository, paymentRepository: PaymentRepository, productStorehouseService: ProductStorehouseService) {
		this.sellingRepository = sellingRepository
		this.paymentRepository = paymentRepository
		this.productStorehouseService = productStorehouseService
	}

	async findMany(query: SellingFindManyRequest) {
		const sellings = (await this.sellingRepository.findMany(query)).map((s) => {
			return {
				...s,
				debt: s.totalSum - s.products.reduce((a, b) => a + BigInt(b.quantity) * BigInt(b.productStorehouse.product.quantity) * b.productStorehouse.product.price, BigInt(0)),
			}
		})
		const sellingsCount = await this.sellingRepository.countFindMany(query)

		const result = query.pagination
			? {
					totalCount: sellingsCount,
					pagesCount: Math.ceil(sellingsCount / query.pageSize),
					pageSize: sellings.length,
					data: sellings,
				}
			: { data: sellings }

		return createResponse({ data: result, success: { messages: ['find many success'] } })
	}

	async findOne(query: SellingFindOneRequest) {
		const selling = await this.sellingRepository.findOne(query)

		if (!selling) {
			throw new BadRequestException('selling not found')
		}

		return createResponse({
			data: {
				...selling,
				debt:
					selling.totalSum -
					selling.products.reduce((a, b) => a + BigInt(b.quantity) * BigInt(b.productStorehouse.product.quantity) * b.productStorehouse.product.price, BigInt(0)),
			},
			success: { messages: ['find one success'] },
		})
	}

	async getMany(query: SellingGetManyRequest) {
		const sellings = await this.sellingRepository.getMany(query)
		const sellingsCount = await this.sellingRepository.countGetMany(query)

		const result = query.pagination
			? {
					pagesCount: Math.ceil(sellingsCount / query.pageSize),
					pageSize: sellings.length,
					data: sellings,
				}
			: { data: sellings }

		return createResponse({ data: result, success: { messages: ['get many success'] } })
	}

	async getOne(query: SellingGetOneRequest) {
		const selling = await this.sellingRepository.getOne(query)

		if (!selling) {
			throw new BadRequestException('selling not found')
		}

		return createResponse({ data: selling, success: { messages: ['get one success'] } })
	}

	async getTotalStats(query: SellingGetTotalStatsRequest) {
		const now = new Date()

		const getDateRange = (type: 'daily' | 'weekly' | 'monthly' | 'yearly') => {
			const start = new Date(now)
			const end = new Date(now)

			if (type === 'weekly') {
				start.setDate(now.getDate() - now.getDay())
				end.setDate(start.getDate() + 6)
			} else if (type === 'monthly') {
				start.setDate(1)
				end.setMonth(start.getMonth() + 1, 0)
			} else if (type === 'yearly') {
				start.setMonth(0, 1)
				end.setMonth(11, 31)
			}

			return { startDate: start, endDate: end }
		}

		const [daily, weekly, monthly, yearly] = await Promise.all(
			(['daily', 'weekly', 'monthly', 'yearly'] as const).map(async (type) => {
				const { startDate, endDate } = getDateRange(type)
				return (await this.sellingRepository.getMany({ pagination: false, startDate, endDate })).reduce((a, b) => a + b.totalSum, BigInt(0))
			}),
		)

		const ourDebt = (await this.sellingRepository.getMany({ pagination: false })).reduce((a, b) => {
			const payment = b.payments.reduce((a, b) => a + b.other, BigInt(0))
			const debt = payment - b.totalSum
			return a + debt
		}, BigInt(0))

		const theirDebt = (await this.sellingRepository.getMany({ pagination: false })).reduce((a, b) => {
			const payment = b.payments.reduce((a, b) => a + b.other, BigInt(0))
			const debt = b.totalSum - payment
			return a + debt
		}, BigInt(0))

		return createResponse({
			data: { daily, weekly, monthly, yearly, ourDebt: ourDebt < 0n ? BigInt(0) : ourDebt, theirDebt: theirDebt < 0n ? BigInt(0) : theirDebt },
			success: { messages: ['get total stats success'] },
		})
	}

	async getPeriodStats(query: SellingGetPeriodStatsRequest) {
		const result = await this.sellingRepository.getPeriodStats(query)

		return createResponse({ data: result, success: { messages: ['get period stats success'] } })
	}

	async createOne(body: SellingCreateOneRequest) {
		const selling = await this.sellingRepository.createOne({ ...body })
		const promises = []
		for (const product of body.products) {
			const productStorehouse = await this.productStorehouseService.getOne({ id: product.id })
			if (!productStorehouse || productStorehouse.data.quantity < product.quantity) {
				throw new BadRequestException('product quanity not enough for selling')
			} else {
				promises.push(this.productStorehouseService.updateOne({ id: product.id }, { quantity: productStorehouse.data.quantity - product.quantity }))
			}
		}
		if (body.payment) {
			promises.push(this.paymentRepository.createOne({ ...body.payment, staffId: body.staffId, clientId: body.clientId, sellingId: selling.id }))
		}

		await Promise.all(promises)

		return createResponse({ data: null, success: { messages: ['create one success'] } })
	}

	// async createOneWithPayment(body: SellingCreateOneRequest) {
	// 	const selling = await this.sellingRepository.createOne({ ...body })
	// 	if (body.payment) {
	// 		await this.paymentRepository.createOne({ ...body.payment, staffId: body.staffId, clientId: body.clientId, sellingId: selling.id })
	// 	}

	// 	return createResponse({ data: null, success: { messages: ['create one with payment success'] } })
	// }

	async updateOne(query: SellingGetOneRequest, body: SellingUpdateOneRequest) {
		await this.getOne(query)

		await this.sellingRepository.updateOne(query, { ...body })

		return createResponse({ data: null, success: { messages: ['update one success'] } })
	}

	async deleteOne(query: SellingGetOneRequest) {
		await this.getOne(query)

		await this.sellingRepository.deleteOne(query)

		return createResponse({ data: null, success: { messages: ['delete one success'] } })
	}
}
