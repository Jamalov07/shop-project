import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared'
import {
	ProductStorehouseCreateManyRequest,
	ProductStorehouseCreateOneRequest,
	ProductStorehouseDeleteManyRequest,
	ProductStorehouseDeleteOneRequest,
	ProductStorehouseFindManyRequest,
	ProductStorehouseGetOneRequest,
	ProductStorehouseTransferManyRequest,
	ProductStorehouseUpdateOneRequest,
} from './interfaces'
import { ProductStorehouseController } from './product-storehouse.controller'

@Injectable()
export class ProductStorehouseRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: ProductStorehouseFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const productStorehouses = await this.prisma.productToStorehouseModel.findMany({
			where: {
				id: { in: query.ids },
				productId: query.productId,
				storehouseId: query.storehouseId,
				quantity: {
					equals: query.quantity,
					gte: query.minQuantity,
					lte: query.maxQuantity,
				},
			},
			select: {
				id: true,
				createdAt: true,
				quantity: true,
				product: {
					select: { barcode: { select: { code: true } }, id: true, cost: true, createdAt: true, image: true, name: true, price: true, quantity: true, warningThreshold: true },
				},
				storehouse: { select: { id: true, createdAt: true, name: true, hexColor: true, position: true } },
			},
			...paginationOptions,
		})

		return productStorehouses
	}

	async getOne(query: ProductStorehouseGetOneRequest) {
		const productStorehouse = await this.prisma.productToStorehouseModel.findFirst({
			where: { id: query.id, storehouseId: query.storehouseId, quantity: query.quantity, productId: query.productId },
		})

		return productStorehouse
	}

	async countFindMany(query: ProductStorehouseFindManyRequest) {
		const productStorehouseCount = await this.prisma.productToStorehouseModel.count({
			where: {
				id: { in: query.ids },
				productId: query.productId,
				storehouseId: query.storehouseId,
				quantity: {
					equals: query.quantity,
					gte: query.minQuantity,
					lte: query.maxQuantity,
				},
			},
		})

		return productStorehouseCount
	}

	async createOne(body: ProductStorehouseCreateOneRequest) {
		const productStorehouse = await this.prisma.productToStorehouseModel.create({
			data: { storehouseId: body.storehouseId, quantity: body.quantity, productId: body.productId },
		})

		return productStorehouse
	}

	async updateOne(query: ProductStorehouseGetOneRequest, body: ProductStorehouseUpdateOneRequest) {
		const productStorehouse = await this.prisma.productToStorehouseModel.update({
			where: { id: query.id },
			data: { storehouseId: body.storehouseId, quantity: body.quantity, productId: body.productId },
		})

		return productStorehouse
	}

	async createMany(body: ProductStorehouseCreateManyRequest) {
		const productStorehouses = await this.prisma.productToStorehouseModel.createMany({
			skipDuplicates: true,
			data: body.products.map((p) => ({ storehouseId: body.storehouseId, quantity: p.quantity, productId: p.id })),
		})

		return productStorehouses
	}

	async updateMany(body: ProductStorehouseCreateManyRequest) {
		const productStorehouses = await this.prisma.productToStorehouseModel.createMany({
			skipDuplicates: true,
			data: body.products.map((p) => ({ storehouseId: body.storehouseId, quantity: p.quantity, productId: p.id })),
		})

		return productStorehouses
	}

	async deleteMany(body: ProductStorehouseDeleteManyRequest) {
		const productStorehouses = await this.prisma.productToStorehouseModel.deleteMany({
			where: { id: { in: body.ids } },
		})

		return productStorehouses
	}

	async deleteOne(query: ProductStorehouseDeleteOneRequest) {
		const productStorehouse = await this.prisma.productToStorehouseModel.delete({
			where: { id: query.id },
		})

		return productStorehouse
	}

	async transferManyProductToAnotherStorehouse(body: ProductStorehouseTransferManyRequest) {
		const promises = []
		for (const product of body.products) {
			promises.push(
				this.prisma.productToStorehouseModel.updateMany({
					where: { storehouseId: body.fromStorehouseId, productId: product.id },
					data: { quantity: { decrement: product.quantity } },
				}),
			)
			promises.push(
				this.prisma.productToStorehouseModel.upsert({
					where: { productId_storehouseId: { productId: product.id, storehouseId: body.toStorehouseId } },
					update: { quantity: { increment: product.quantity } },
					create: {
						productId: product.id,
						storehouseId: body.toStorehouseId,
						quantity: product.quantity,
					},
				}),
			)
		}

		return body.toStorehouseId
	}

	async onModuleInit() {
		await this.prisma.createActionMethods(ProductStorehouseController)
	}
}
