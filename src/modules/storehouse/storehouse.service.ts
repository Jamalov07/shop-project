import { BadRequestException, Injectable } from '@nestjs/common'
import { StorehouseRepository } from './storehouse.repository'
import { createResponse } from '@common'
import {
	StorehouseGetOneRequest,
	StorehouseCreateOneRequest,
	StorehouseUpdateOneRequest,
	StorehouseGetManyRequest,
	StorehouseFindManyRequest,
	StorehouseFindOneRequest,
	StorehouseProductCreateManyRequest,
	StorehouseProductDeleteManyRequest,
	StorehouseProductCreateOneRequest,
	StorehouseProductDeleteOneRequest,
} from './interfaces'

@Injectable()
export class StorehouseService {
	private readonly storehouseRepository: StorehouseRepository

	constructor(storehouseRepository: StorehouseRepository) {
		this.storehouseRepository = storehouseRepository
	}

	async findMany(query: StorehouseFindManyRequest) {
		const storehouses = await this.storehouseRepository.findMany(query)
		const storehousesCount = await this.storehouseRepository.countFindMany(query)

		const result = query.pagination ? { pagesCount: Math.ceil(storehousesCount / query.pageSize), pageSize: storehouses.length, data: storehouses } : storehouses

		return createResponse({ data: result, success: { messages: ['find many success'] } })
	}

	async findOne(query: StorehouseFindOneRequest) {
		const storehouse = await this.storehouseRepository.findOne(query)

		if (!storehouse) {
			throw new BadRequestException('storehouse not found')
		}

		return createResponse({ data: storehouse, success: { messages: ['find one success'] } })
	}

	async getMany(query: StorehouseGetManyRequest) {
		const storehouses = await this.storehouseRepository.getMany(query)
		const storehousesCount = await this.storehouseRepository.countGetMany(query)

		const result = query.pagination ? { pagesCount: Math.ceil(storehousesCount / query.pageSize), pageSize: storehouses.length, data: storehouses } : storehouses

		return createResponse({ data: result, success: { messages: ['get many success'] } })
	}

	async getOne(query: StorehouseGetOneRequest) {
		const storehouse = await this.storehouseRepository.getOne(query)

		if (!storehouse) {
			throw new BadRequestException('storehouse not found')
		}

		return createResponse({ data: storehouse, success: { messages: ['get one success'] } })
	}

	async createOne(body: StorehouseCreateOneRequest) {
		const candidate = await this.storehouseRepository.getOne({ name: body.name })
		if (candidate) {
			throw new BadRequestException('name already exists')
		}

		await this.storehouseRepository.createOne({ ...body })

		return createResponse({ data: null, success: { messages: ['create success'] } })
	}

	async updateOne(query: StorehouseGetOneRequest, body: StorehouseUpdateOneRequest) {
		await this.getOne(query)

		const candidate = await this.storehouseRepository.getOne({ name: body.name })
		if (candidate && candidate.id !== query.id) {
			throw new BadRequestException('name already exists')
		}

		await this.storehouseRepository.updateOne(query, { ...body })

		return createResponse({ data: null, success: { messages: ['update success'] } })
	}

	async deleteOne(query: StorehouseGetOneRequest) {
		await this.getOne(query)

		await this.storehouseRepository.deleteOne(query)

		return createResponse({ data: null, success: { messages: ['delete success'] } })
	}

	async createOneStorehouseProduct(body: StorehouseProductCreateOneRequest) {
		const storehouseProduct = await this.storehouseRepository.getOneStorehouseProduct({ ...body, quantity: undefined })

		if (storehouseProduct) {
			const updated = await this.storehouseRepository.updateOneStorehouseProduct(storehouseProduct.id, {
				...body,
				quantity: storehouseProduct.quantity + body.quantity,
			})
		} else {
			const created = await this.storehouseRepository.createOneStorehouseProduct(body)
		}

		return createResponse({ data: null, success: { messages: ['create one storehouse product success'] } })
	}

	async deleteOneStorehouseProduct(query: StorehouseProductDeleteOneRequest) {
		const storehouseProduct = await this.storehouseRepository.getOneStorehouseProduct({ id: query.id })

		if (!storehouseProduct) {
			throw new BadRequestException('storehouse product not found')
		}

		const deleted = await this.storehouseRepository.deleteOneStorehouseProduct(query)

		return createResponse({ data: null, success: { messages: ['delete one storehouse product success'] } })
	}
}
