import { BadRequestException, Injectable } from '@nestjs/common'
import { ProductStorehouseRepository } from './product-storehouse.repository'
import { createResponse } from '@common'
import { ProductStorehouseCreateOneRequest, ProductStorehouseDeleteOneRequest } from './interfaces'

@Injectable()
export class ProductStorehouseService {
	private readonly storehouseRepository: ProductStorehouseRepository

	constructor(storehouseRepository: ProductStorehouseRepository) {
		this.storehouseRepository = storehouseRepository
	}

	async createOne(body: ProductStorehouseCreateOneRequest) {
		const productStorehouse = await this.storehouseRepository.getOne({ ...body, quantity: undefined })

		if (productStorehouse) {
			const updated = await this.storehouseRepository.updateOne(productStorehouse.id, {
				...body,
				quantity: productStorehouse.quantity + body.quantity,
			})
		} else {
			const created = await this.storehouseRepository.createOne(body)
		}

		return createResponse({ data: null, success: { messages: ['create one storehouse product success'] } })
	}

	async deleteOne(query: ProductStorehouseDeleteOneRequest) {
		const productStorehouse = await this.storehouseRepository.getOne({ id: query.id })

		if (!productStorehouse) {
			throw new BadRequestException('storehouse product not found')
		}

		const deleted = await this.storehouseRepository.deleteOne(query)

		return createResponse({ data: null, success: { messages: ['delete one storehouse product success'] } })
	}
}
