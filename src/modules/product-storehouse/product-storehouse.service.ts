import { BadRequestException, Injectable } from '@nestjs/common'
import { ProductStorehouseRepository } from './product-storehouse.repository'
import { createResponse } from '@common'
import { ProductStorehouseCreateOneRequest, ProductStorehouseDeleteOneRequest, ProductStorehouseFindManyRequest } from './interfaces'

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
			: productStorehouses

		return createResponse({ data: result, success: { messages: ['find many success'] } })
	}

	async createOne(body: ProductStorehouseCreateOneRequest) {
		const productStorehouse = await this.productStorehouseRepository.getOne({ ...body, quantity: undefined })

		if (productStorehouse) {
			const updated = await this.productStorehouseRepository.updateOne(productStorehouse.id, {
				...body,
				quantity: productStorehouse.quantity + body.quantity,
			})
		} else {
			const created = await this.productStorehouseRepository.createOne(body)
		}

		return createResponse({ data: null, success: { messages: ['create one storehouse product success'] } })
	}

	async deleteOne(query: ProductStorehouseDeleteOneRequest) {
		const productStorehouse = await this.productStorehouseRepository.getOne({ id: query.id })

		if (!productStorehouse) {
			throw new BadRequestException('storehouse product not found')
		}

		const deleted = await this.productStorehouseRepository.deleteOne(query)

		return createResponse({ data: null, success: { messages: ['delete one storehouse product success'] } })
	}
}
