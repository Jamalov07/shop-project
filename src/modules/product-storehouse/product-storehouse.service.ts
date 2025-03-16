import { BadRequestException, Injectable } from '@nestjs/common'
import { ProductStorehouseRepository } from './product-storehouse.repository'
import { createResponse } from '@common'
import {
	ProductStorehouseCreateOneRequest,
	ProductStorehouseDeleteOneRequest,
	ProductStorehouseFindManyRequest,
	ProductStorehouseGetOneRequest,
	ProductStorehouseTransferManyRequest,
	ProductStorehouseUpdateOneRequest,
} from './interfaces'

@Injectable()
export class ProductStorehouseService {
	private readonly productStorehouseRepository: ProductStorehouseRepository

	constructor(productStorehouseRepository: ProductStorehouseRepository) {
		this.productStorehouseRepository = productStorehouseRepository
	}

	async findMany(query: ProductStorehouseFindManyRequest) {
		const productStorehouses = await this.productStorehouseRepository.findMany(query)
		const productStorehousesCount = await this.productStorehouseRepository.countFindMany(query)

		const result = query.pagination
			? { totalCount: productStorehousesCount, pagesCount: Math.ceil(productStorehousesCount / query.pageSize), pageSize: productStorehouses.length, data: productStorehouses }
			: { data: productStorehouses }

		return createResponse({ data: result, success: { messages: ['find many success'] } })
	}

	async getOne(query: ProductStorehouseGetOneRequest) {
		const productStorehouse = await this.productStorehouseRepository.getOne(query)

		if (!productStorehouse) {
			throw new BadRequestException('product storehouse not found')
		}

		return createResponse({ data: productStorehouse, success: { messages: ['get one success'] } })
	}

	async createOne(body: ProductStorehouseCreateOneRequest) {
		const productStorehouse = await this.productStorehouseRepository.getOne({ ...body, quantity: undefined })

		if (productStorehouse) {
			const updated = await this.productStorehouseRepository.updateOne(
				{ id: productStorehouse.id },
				{
					...body,
					quantity: productStorehouse.quantity + body.quantity,
				},
			)
		} else {
			const created = await this.productStorehouseRepository.createOne(body)
		}

		return createResponse({ data: null, success: { messages: ['create one storehouse product success'] } })
	}

	async updateOne(query: ProductStorehouseGetOneRequest, body: ProductStorehouseUpdateOneRequest) {
		const productStorehouse = await this.productStorehouseRepository.getOne({ id: query.id })

		if (!productStorehouse) {
			throw new BadRequestException('product storehouse not found')
		}

		const updated = await this.productStorehouseRepository.updateOne(query, body)

		return createResponse({ data: null, success: { messages: ['update one storehouse product success'] } })
	}

	async deleteOne(query: ProductStorehouseDeleteOneRequest) {
		const productStorehouse = await this.productStorehouseRepository.getOne({ id: query.id })

		if (!productStorehouse) {
			throw new BadRequestException('storehouse product not found')
		}

		const deleted = await this.productStorehouseRepository.deleteOne(query)

		return createResponse({ data: null, success: { messages: ['delete one storehouse product success'] } })
	}

	async transferManyProductToAnotherStorehouse(body: ProductStorehouseTransferManyRequest) {
		for (const product of body.products) {
			const productStorehouse = await this.getOne({ storehouseId: body.fromStorehouseId, productId: product.id })
			if (!productStorehouse || productStorehouse.data.quantity < product.quantity) {
				throw new BadRequestException('product quantity not enough for transfer in this storehouse')
			}
		}

		const result = await this.productStorehouseRepository.transferManyProductToAnotherStorehouse(body)

		return createResponse({ data: null, success: { messages: ['transfer many product to another storehouse success'] } })
	}
}
