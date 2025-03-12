import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared'
import {
	ProductCreateOneRequest,
	ProductDeleteOneRequest,
	ProductFindManyRequest,
	ProductFindOneforSellingRequest,
	ProductFindOneRequest,
	ProductGetManyRequest,
	ProductGetOneRequest,
	ProductUpdateOneRequest,
} from './interfaces'
import { ProductController } from './product.controller'

@Injectable()
export class ProductRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: ProductFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const products = await this.prisma.productModel.findMany({
			where: {
				id: { in: query.ids },
				name: { contains: query.name, mode: 'insensitive' },
			},
			...paginationOptions,
			select: {
				id: true,
				cost: true,
				image: true,
				name: true,
				price: true,
				quantity: true,
				createdAt: true,
				warningThreshold: true,
				storehouses: { select: { quantity: true } },
				barcode: { select: { code: true } },
			},
		})

		return products
	}

	async findOne(query: ProductFindOneRequest) {
		const product = await this.prisma.productModel.findFirst({
			where: {
				id: query.id,
				name: { contains: query.name, mode: 'insensitive' },
			},
			select: {
				id: true,
				cost: true,
				image: true,
				name: true,
				price: true,
				quantity: true,
				createdAt: true,
				warningThreshold: true,
				storehouses: { select: { quantity: true } },
				barcode: { select: { code: true } },
			},
		})

		return product
	}

	async findOneForSelling(query: ProductFindOneforSellingRequest) {
		const product = await this.prisma.productModel.findFirst({
			where: { id: query.id, barcode: { code: query.code } },
			select: {
				id: true,
				cost: true,
				image: true,
				name: true,
				price: true,
				quantity: true,
				createdAt: true,
				warningThreshold: true,
				barcode: { select: { code: true } },
				storehouses: {
					select: { id: true, quantity: true, createdAt: true, storehouse: { select: { id: true, name: true, hexColor: true, position: true, createdAt: true } } },
					where: { quantity: { gte: query.minQuantity } },
				},
			},
		})

		if (!product) return null

		product.storehouses.sort((a, b) => a.storehouse.position - b.storehouse.position)

		return product
	}

	async countFindMany(query: ProductFindManyRequest) {
		const productsCount = await this.prisma.productModel.count({
			where: {
				id: { in: query.ids },
				name: { contains: query.name, mode: 'insensitive' },
			},
		})

		return productsCount
	}

	async getMany(query: ProductGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const products = await this.prisma.productModel.findMany({
			where: {
				id: { in: query.ids },
				name: query.name,
				cost: query.cost,
				price: query.price,
				quantity: query.quantity,
			},
			...paginationOptions,
		})

		return products
	}

	async getOne(query: ProductGetOneRequest) {
		const product = await this.prisma.productModel.findFirst({
			where: {
				id: query.id,
				name: query.name,
				cost: query.cost,
				price: query.price,
				quantity: query.quantity,
			},
		})

		return product
	}

	async countGetMany(query: ProductGetManyRequest) {
		const productsCount = await this.prisma.productModel.count({
			where: {
				id: { in: query.ids },
				name: query.name,
				cost: query.cost,
				price: query.price,
				quantity: query.quantity,
			},
		})

		return productsCount
	}

	async createOne(body: ProductCreateOneRequest) {
		const barcode = await this.getOrCreateBarcode()

		const product = await this.prisma.productModel.create({
			data: {
				name: body.name,
				warningThreshold: body.warningThreshold,
				cost: body.cost,
				price: body.price,
				quantity: body.quantity,
				image: body.image,
				barcodeId: barcode.id,
			},
		})
		return product
	}

	async updateOne(query: ProductGetOneRequest, body: ProductUpdateOneRequest) {
		const product = await this.prisma.productModel.update({
			where: { id: query.id },
			data: {
				name: body.name,
				warningThreshold: body.warningThreshold,
				cost: body.cost,
				price: body.price,
				quantity: body.quantity,
				image: body.image,
			},
		})

		return product
	}

	async deleteOne(query: ProductDeleteOneRequest) {
		const product = await this.prisma.productModel.delete({
			where: { id: query.id },
		})

		return product
	}

	async getOrCreateBarcode() {
		let barcode = await this.prisma.barcodeModel.findFirst({ orderBy: { code: 'desc' } })
		if (!barcode) {
			barcode = await this.prisma.barcodeModel.create({})
			return barcode
		} else {
			barcode = await this.prisma.barcodeModel.create({ data: { code: barcode.code + 1 } })
			return barcode
		}
	}

	async onModuleInit() {
		await this.prisma.createActionMethods(ProductController)
	}
}
