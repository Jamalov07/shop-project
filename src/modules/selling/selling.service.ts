import { BadRequestException, Injectable } from '@nestjs/common'
import { SellingRepository } from './selling.repository'
import { createResponse } from '@common'
import { SellingGetOneRequest, SellingCreateOneRequest, SellingUpdateOneRequest, SellingGetManyRequest, SellingFindManyRequest, SellingFindOneRequest } from './interfaces'
import { PaymentRepository } from '../payment'

@Injectable()
export class SellingService {
	private readonly sellingRepository: SellingRepository
	private readonly paymentRepository: PaymentRepository

	constructor(sellingRepository: SellingRepository, paymentRepository: PaymentRepository) {
		this.sellingRepository = sellingRepository
		this.paymentRepository = paymentRepository
	}

	async findMany(query: SellingFindManyRequest) {
		const sellings = await this.sellingRepository.findMany(query)
		const sellingsCount = await this.sellingRepository.countFindMany(query)

		const result = query.pagination ? { totalCount: sellingsCount, pagesCount: Math.ceil(sellingsCount / query.pageSize), pageSize: sellings.length, data: sellings } : sellings

		return createResponse({ data: result, success: { messages: ['find many success'] } })
	}

	async findOne(query: SellingFindOneRequest) {
		const selling = await this.sellingRepository.findOne(query)

		if (!selling) {
			throw new BadRequestException('selling not found')
		}

		return createResponse({ data: selling, success: { messages: ['find one success'] } })
	}

	async getMany(query: SellingGetManyRequest) {
		const sellings = await this.sellingRepository.getMany(query)
		const sellingsCount = await this.sellingRepository.countGetMany(query)

		const result = query.pagination ? { pagesCount: Math.ceil(sellingsCount / query.pageSize), pageSize: sellings.length, data: sellings } : sellings

		return createResponse({ data: result, success: { messages: ['get many success'] } })
	}

	async getOne(query: SellingGetOneRequest) {
		const selling = await this.sellingRepository.getOne(query)

		if (!selling) {
			throw new BadRequestException('selling not found')
		}

		return createResponse({ data: selling, success: { messages: ['get one success'] } })
	}

	async createOne(body: SellingCreateOneRequest) {
		await this.sellingRepository.createOne({ ...body })

		return createResponse({ data: null, success: { messages: ['create success'] } })
	}

	async createOneWithPayment(body: SellingCreateOneRequest) {
		const selling = await this.sellingRepository.createOne({ ...body })
		if (body.payment) {
			await this.paymentRepository.createOnePro({ ...body.payment, staffId: body.staffId, clientId: body.clientId }, selling.id)
		}

		return createResponse({ data: null, success: { messages: ['create one with payment success'] } })
	}

	async updateOne(query: SellingGetOneRequest, body: SellingUpdateOneRequest) {
		await this.getOne(query)

		await this.sellingRepository.updateOne(query, { ...body })

		return createResponse({ data: null, success: { messages: ['update success'] } })
	}

	async deleteOne(query: SellingGetOneRequest) {
		await this.getOne(query)

		await this.sellingRepository.deleteOne(query)

		return createResponse({ data: null, success: { messages: ['delete success'] } })
	}
}
