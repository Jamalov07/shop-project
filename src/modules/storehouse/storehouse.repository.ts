import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared'
import {
	StorehouseCreateOneRequest,
	StorehouseDeleteOneRequest,
	StorehouseFindManyRequest,
	StorehouseFindOneRequest,
	StorehouseGetManyRequest,
	StorehouseGetOneRequest,
	StorehouseUpdateOneRequest,
} from './interfaces'
import { StorehouseController } from './storehouse.controller'

@Injectable()
export class StorehouseRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: StorehouseFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const storehouses = await this.prisma.storehouseModel.findMany({
			where: {
				id: { in: query.ids },
				name: { contains: query.name, mode: 'insensitive' },
				hexColor: { contains: query.hexColor, mode: 'insensitive' },
			},
			...paginationOptions,
		})

		return storehouses
	}

	async findOne(query: StorehouseFindOneRequest) {
		const storehouse = await this.prisma.storehouseModel.findFirst({
			where: {
				id: query.id,
				name: { contains: query.name, mode: 'insensitive' },
				hexColor: { contains: query.hexColor, mode: 'insensitive' },
			},
			select: {
				id: true,
				hexColor: true,
				name: true,
				position: true,
				createdAt: true,
				products: {
					select: {
						id: true,
						quantity: true,
						product: { select: { id: true, cost: true, createdAt: true, image: true, name: true, price: true, quantity: true, warningThreshold: true } },
					},
				},
			},
		})

		return storehouse
	}

	async countFindMany(query: StorehouseFindManyRequest) {
		const storehousesCount = await this.prisma.storehouseModel.count({
			where: {
				id: { in: query.ids },
				name: { contains: query.name, mode: 'insensitive' },
				hexColor: { contains: query.hexColor, mode: 'insensitive' },
			},
		})

		return storehousesCount
	}

	async getMany(query: StorehouseGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const storehouses = await this.prisma.storehouseModel.findMany({
			where: {
				id: { in: query.ids },
				name: query.name,
				hexColor: query.hexColor,
			},
			...paginationOptions,
		})

		return storehouses
	}

	async getOne(query: StorehouseGetOneRequest) {
		const storehouse = await this.prisma.storehouseModel.findFirst({
			where: {
				id: query.id,
				name: query.name,
				hexColor: query.hexColor,
			},
		})

		return storehouse
	}

	async countGetMany(query: StorehouseGetManyRequest) {
		const storehousesCount = await this.prisma.storehouseModel.count({
			where: {
				id: { in: query.ids },
				name: query.name,
				hexColor: query.hexColor,
			},
		})

		return storehousesCount
	}

	async createOne(body: StorehouseCreateOneRequest) {
		const lastStorehouse = await this.prisma.storehouseModel.findFirst({ orderBy: [{ position: 'desc' }] })

		const storehouse = await this.prisma.storehouseModel.create({
			data: {
				name: body.name,
				hexColor: body.hexColor,
				position: (lastStorehouse?.position ?? 0) + 1,
			},
		})
		return storehouse
	}

	async updateOne(query: StorehouseGetOneRequest, body: StorehouseUpdateOneRequest) {
		const store = await this.getOne(query)

		if (body.position) {
			await this.changeManyStorehousesPosition(store.position, body.position)
		}
		const storehouse = await this.prisma.storehouseModel.update({
			where: { id: query.id },
			data: {
				name: body.name,
				hexColor: body.hexColor,
				position: body.position,
			},
		})

		return storehouse
	}

	async changeManyStorehousesPosition(oldPosition: number, newPosition: number) {
		if (oldPosition > newPosition) {
			await this.prisma.storehouseModel.updateMany({
				where: { position: { gte: newPosition, lt: oldPosition } },
				data: { position: { increment: 1 } },
			})
		} else {
			await this.prisma.storehouseModel.updateMany({
				where: { position: { gt: oldPosition, lte: newPosition } },
				data: { position: { decrement: 1 } },
			})
		}
	}

	async deleteOne(query: StorehouseDeleteOneRequest) {
		const storehouse = await this.prisma.storehouseModel.delete({
			where: { id: query.id },
		})

		return storehouse
	}

	async onModuleInit() {
		await this.prisma.createActionMethods(StorehouseController)
	}
}
