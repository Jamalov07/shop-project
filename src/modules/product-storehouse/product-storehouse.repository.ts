import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared'
import {
	ProductStorehouseCreateManyRequest,
	ProductStorehouseCreateOneRequest,
	ProductStorehouseDeleteManyRequest,
	ProductStorehouseDeleteOneRequest,
	ProductStorehouseGetOneRequest,
	ProductStorehouseUpdateOneRequest,
} from './interfaces'
import { ProductStorehouseController } from './product-storehouse.controller'

@Injectable()
export class ProductStorehouseRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async getOne(body: ProductStorehouseGetOneRequest) {
		const productStorehouse = await this.prisma.productToStorehouseModel.findFirst({
			where: { storehouseId: body.storehouseId, quantity: body.quantity, productId: body.productId },
		})

		return productStorehouse
	}

	async createOne(body: ProductStorehouseCreateOneRequest) {
		const productStorehouse = await this.prisma.productToStorehouseModel.create({
			data: { storehouseId: body.storehouseId, quantity: body.quantity, productId: body.productId },
		})

		return productStorehouse
	}

	async updateOne(id: string, body: ProductStorehouseUpdateOneRequest) {
		const productStorehouse = await this.prisma.productToStorehouseModel.update({
			where: { id: id },
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

	async onModuleInit() {
		await this.prisma.createActionMethods(ProductStorehouseController)
	}
}
