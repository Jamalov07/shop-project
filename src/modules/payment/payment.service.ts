import { BadRequestException, Injectable } from '@nestjs/common'
import { PaymentRepository } from './payment.repository'
import { createResponse } from '@common'
import { PaymentGetOneRequest, PaymentCreateOneRequest, PaymentUpdateOneRequest, PaymentGetManyRequest, PaymentFindManyRequest, PaymentFindOneRequest } from './interfaces'

@Injectable()
export class PaymentService {
	private readonly paymentRepository: PaymentRepository

	constructor(paymentRepository: PaymentRepository) {
		this.paymentRepository = paymentRepository
	}

	async findMany(query: PaymentFindManyRequest) {
		const payments = await this.paymentRepository.findMany(query)
		const paymentsCount = await this.paymentRepository.countFindMany(query)
		let pageCash = BigInt(0)
		let pageCard = BigInt(0)
		let pageOther = BigInt(0)
		for (const payment of payments) {
			pageCash += payment.cash
			pageCard += payment.card
			pageOther += payment.other
		}

		const fullPayments = await this.paymentRepository.findMany({ pagination: false })
		let totalCash = BigInt(0)
		let totalCard = BigInt(0)
		let totalOther = BigInt(0)
		for (const payment of fullPayments) {
			totalCash += payment.cash
			totalCard += payment.card
			totalOther += payment.other
		}

		const result = query.pagination
			? {
					calc: {
						inPage: { card: pageCard, cash: pageCash, other: pageOther },
						inTotal: { card: totalCard, cash: totalCash, other: totalOther },
					},
					totalCount: paymentsCount,
					pagesCount: Math.ceil(paymentsCount / query.pageSize),
					pageSize: payments.length,
					data: payments,
				}
			: payments

		return createResponse({ data: result, success: { messages: ['find many success'] } })
	}

	async findOne(query: PaymentFindOneRequest) {
		const payment = await this.paymentRepository.findOne(query)

		if (!payment) {
			throw new BadRequestException('payment not found')
		}

		return createResponse({ data: payment, success: { messages: ['find one success'] } })
	}

	async getMany(query: PaymentGetManyRequest) {
		const payments = await this.paymentRepository.getMany(query)
		const paymentsCount = await this.paymentRepository.countGetMany(query)

		const result = query.pagination ? { pagesCount: Math.ceil(paymentsCount / query.pageSize), pageSize: payments.length, data: payments } : payments

		return createResponse({ data: result, success: { messages: ['get many success'] } })
	}

	async getOne(query: PaymentGetOneRequest) {
		const payment = await this.paymentRepository.getOne(query)

		if (!payment) {
			throw new BadRequestException('payment not found')
		}

		return createResponse({ data: payment, success: { messages: ['get one success'] } })
	}

	async createOne(body: PaymentCreateOneRequest) {
		await this.paymentRepository.createOne({ ...body })

		return createResponse({ data: null, success: { messages: ['create success'] } })
	}

	// async createOnePro(body: PaymentCreateOneRequest, sellingId?: string) {
	// 	await this.paymentRepository.createOnePro({ ...body }, sellingId)

	// 	return createResponse({ data: null, success: { messages: ['create one pro success'] } })
	// }

	async updateOne(query: PaymentGetOneRequest, body: PaymentUpdateOneRequest) {
		await this.paymentRepository.updateOne(query, { ...body })

		return createResponse({ data: null, success: { messages: ['update success'] } })
	}
}
