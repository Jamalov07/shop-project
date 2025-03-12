import { BadRequestException, Injectable } from '@nestjs/common'
import { ProductRepository } from './product.repository'
import { createResponse } from '@common'
import {
	ProductGetOneRequest,
	ProductCreateOneRequest,
	ProductUpdateOneRequest,
	ProductGetManyRequest,
	ProductFindManyRequest,
	ProductFindOneRequest,
	ProductFindOneforSellingRequest,
} from './interfaces'

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
		let pageCost = BigInt(0)
		let pagePrice = BigInt(0)
		let pagePackages = 0
		let pageQuantityInPackages = 0
		for (const product of products) {
			const productCount = product.storehouses.reduce((a, b) => a + b.quantity, 0)
			const productQuantityCount = productCount * product.quantity

			pagePackages += productCount
			pageQuantityInPackages += productQuantityCount
			pageCost += BigInt(productQuantityCount) * product.cost
			pagePrice += BigInt(productQuantityCount) * product.price
		}

		const fullProducts = await this.productRepository.findMany({ pagination: false })

		let totalCost = BigInt(0)
		let totalPrice = BigInt(0)
		let totalPackages = 0
		let totalQuantityInPackages = 0
		for (const product of fullProducts) {
			const productCount = product.storehouses.reduce((a, b) => a + b.quantity, 0)
			const productQuantityCount = productCount * product.quantity

			totalPackages += productCount
			totalQuantityInPackages += productQuantityCount
			totalCost += BigInt(productQuantityCount) * product.cost
			totalPrice += BigInt(productQuantityCount) * product.price
		}

		const productsCount = await this.productRepository.countFindMany(query)

		const result = query.pagination
			? {
					calc: {
						inPage: { totalPackages: pagePackages, totalQuantityInPackages: pageQuantityInPackages, totalCost: pageCost, totalPrice: pagePrice },
						inTotal: { totalPackages: totalPackages, totalQuantityInPackages: totalQuantityInPackages, totalCost: totalCost, totalPrice: totalPrice },
					},
					totalCount: productsCount,
					pagesCount: Math.ceil(productsCount / query.pageSize),
					pageSize: products.length,
					data: products,
				}
			: { data: products }

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

	async findOneForSelling(query: ProductFindOneforSellingRequest) {
		if (!query.code || !query.id) {
			throw new BadRequestException('provide id or code')
		}

		const product = await this.productRepository.findOneForSelling(query)

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

		const result = query.pagination
			? {
					pagesCount: Math.ceil(productsCount / query.pageSize),
					pageSize: products.length,
					data: products,
				}
			: { data: products }

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
