import { BadRequestException, Injectable } from '@nestjs/common'
import { ProductRepository } from './product.repository'
import { createResponse } from '@common'
import { ProductGetOneRequest, ProductCreateOneRequest, ProductUpdateOneRequest, ProductGetManyRequest, ProductFindManyRequest, ProductFindOneRequest } from './interfaces'

@Injectable()
export class ProductService {
	private readonly productRepository: ProductRepository

	constructor(productRepository: ProductRepository) {
		this.productRepository = productRepository
	}

	async findMany(query: ProductFindManyRequest) {
		const products = (await this.productRepository.findMany(query)).map((p) => {
			return { ...p, countInStorehouses: p.storehouses.reduce((a, b) => a + b.quantity, 0) }
		})
		const productsCount = await this.productRepository.countFindMany(query)

		const result = query.pagination ? { totalCount: productsCount, pagesCount: Math.ceil(productsCount / query.pageSize), pageSize: products.length, data: products } : products

		return createResponse({ data: result, success: { messages: ['find many success'] } })
	}

	async findOne(query: ProductFindOneRequest) {
		const product = await this.productRepository.findOne(query)

		if (!product) {
			throw new BadRequestException('product not found')
		}

		return createResponse({
			data: { ...product, countInStorehouses: product.storehouses.reduce((a, b) => a + b.quantity, 0) },
			success: { messages: ['find one success'] },
		})
	}

	async getMany(query: ProductGetManyRequest) {
		const products = await this.productRepository.getMany(query)
		const productsCount = await this.productRepository.countGetMany(query)

		const result = query.pagination ? { pagesCount: Math.ceil(productsCount / query.pageSize), pageSize: products.length, data: products } : products

		return createResponse({ data: result, success: { messages: ['get many success'] } })
	}

	async getOne(query: ProductGetOneRequest) {
		const product = await this.productRepository.getOne(query)

		if (!product) {
			throw new BadRequestException('product not found')
		}

		return createResponse({ data: product, success: { messages: ['get one success'] } })
	}

	async createOne(body: ProductCreateOneRequest) {
		const candidate = await this.productRepository.getOne({ name: body.name })
		if (candidate) {
			throw new BadRequestException('name already exists')
		}

		await this.productRepository.createOne({ ...body })

		return createResponse({ data: null, success: { messages: ['create success'] } })
	}

	async updateOne(query: ProductGetOneRequest, body: ProductUpdateOneRequest) {
		await this.getOne(query)

		const candidate = await this.productRepository.getOne({ name: body.name })
		if (candidate && candidate.id !== query.id) {
			throw new BadRequestException('name already exists')
		}

		await this.productRepository.updateOne(query, { ...body })

		return createResponse({ data: null, success: { messages: ['update success'] } })
	}

	async deleteOne(query: ProductGetOneRequest) {
		await this.getOne(query)

		await this.productRepository.deleteOne(query)

		return createResponse({ data: null, success: { messages: ['delete success'] } })
	}
}
