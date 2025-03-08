import { BadRequestException, Injectable } from '@nestjs/common'
import { SellingRepository } from './selling.repository'
import { createResponse } from '@common'
import { SellingGetOneRequest, SellingCreateOneRequest, SellingUpdateOneRequest, SellingGetManyRequest, SellingFindManyRequest, SellingFindOneRequest } from './interfaces'
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
		const sellings = await this.sellingRepository.findMany(query)
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

		return createResponse({ data: selling, success: { messages: ['find one success'] } })
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

		await this.sellingRepository.createOne(body)
		await Promise.all(promises)

		return createResponse({ data: null, success: { messages: ['create success'] } })
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

		return createResponse({ data: null, success: { messages: ['update success'] } })
	}

	async deleteOne(query: SellingGetOneRequest) {
		await this.getOne(query)

		await this.sellingRepository.deleteOne(query)

		return createResponse({ data: null, success: { messages: ['delete success'] } })
	}
}
