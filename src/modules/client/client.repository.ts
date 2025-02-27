import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared'
import { ClientCreateOneRequest, ClientFindManyRequest, ClientFindOneRequest, ClientGetManyRequest, ClientGetOneRequest, ClientUpdateOneRequest } from './interfaces'
import { ClientController } from './client.controller'

@Injectable()
export class ClientRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: ClientFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const clients = await this.prisma.clientModel.findMany({
			where: {
				id: { in: query.ids },
				phone: { contains: query.phone, mode: 'insensitive' },
				fullname: { contains: query.fullname, mode: 'insensitive' },
			},
			...paginationOptions,
		})

		return clients
	}

	async findOne(query: ClientFindOneRequest) {
		const client = await this.prisma.clientModel.findFirst({
			where: {
				id: query.id,
				phone: { contains: query.phone, mode: 'insensitive' },
				fullname: { contains: query.fullname, mode: 'insensitive' },
			},
		})

		return client
	}

	async countFindMany(query: ClientFindManyRequest) {
		const clientsCount = await this.prisma.clientModel.count({
			where: {
				id: { in: query.ids },
				phone: { contains: query.phone, mode: 'insensitive' },
				fullname: { contains: query.fullname, mode: 'insensitive' },
			},
		})

		return clientsCount
	}

	async getMany(query: ClientGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const clients = await this.prisma.clientModel.findMany({
			where: {
				id: { in: query.ids },
				phone: query.phone,
				fullname: query.fullname,
			},
			...paginationOptions,
		})

		return clients
	}

	async getOne(query: ClientGetOneRequest) {
		const client = await this.prisma.clientModel.findFirst({
			where: {
				id: query.id,
				phone: query.phone,
				fullname: query.fullname,
			},
		})

		return client
	}

	async countGetMany(query: ClientGetManyRequest) {
		const clientsCount = await this.prisma.clientModel.count({
			where: {
				id: { in: query.ids },
				phone: query.phone,
				fullname: query.fullname,
			},
		})

		return clientsCount
	}

	async createOne(body: ClientCreateOneRequest) {
		const client = await this.prisma.clientModel.create({
			data: {
				phone: body.phone,
				fullname: body.fullname,
			},
		})
		return client
	}

	async updateOne(query: ClientGetOneRequest, body: ClientUpdateOneRequest) {
		const client = await this.prisma.clientModel.update({
			where: { id: query.id },
			data: {
				phone: body.phone,
				fullname: body.fullname,
			},
		})

		return client
	}

	async onModuleInit() {
		await this.prisma.createActionMethods(ClientController)
	}
}
