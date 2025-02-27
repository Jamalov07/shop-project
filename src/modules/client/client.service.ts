import { BadRequestException, Injectable } from '@nestjs/common'
import { ClientRepository } from './client.repository'
import { createResponse } from '@common'
import { ClientGetOneRequest, ClientCreateOneRequest, ClientUpdateOneRequest, ClientGetManyRequest, ClientFindManyRequest, ClientFindOneRequest } from './interfaces'

@Injectable()
export class ClientService {
	private readonly clientRepository: ClientRepository

	constructor(clientRepository: ClientRepository) {
		this.clientRepository = clientRepository
	}

	async findMany(query: ClientFindManyRequest) {
		const clients = await this.clientRepository.findMany(query)
		const clientsCount = await this.clientRepository.countFindMany(query)

		const result = query.pagination ? { pagesCount: Math.ceil(clientsCount / query.pageSize), pageSize: clients.length, data: clients } : clients

		return createResponse({ data: result, success: { messages: ['find many success'] } })
	}

	async findOne(query: ClientFindOneRequest) {
		const client = await this.clientRepository.findOne(query)

		if (!client) {
			throw new BadRequestException('client not found')
		}

		return createResponse({ data: client, success: { messages: ['find one success'] } })
	}

	async getMany(query: ClientGetManyRequest) {
		const clients = await this.clientRepository.getMany(query)
		const clientsCount = await this.clientRepository.countGetMany(query)

		const result = query.pagination ? { pagesCount: Math.ceil(clientsCount / query.pageSize), pageSize: clients.length, data: clients } : clients

		return createResponse({ data: result, success: { messages: ['get many success'] } })
	}

	async getOne(query: ClientGetOneRequest) {
		const client = await this.clientRepository.getOne(query)

		if (!client) {
			throw new BadRequestException('client not found')
		}

		return createResponse({ data: client, success: { messages: ['get one success'] } })
	}

	async createOne(body: ClientCreateOneRequest) {
		await this.clientRepository.createOne({ ...body })

		return createResponse({ data: null, success: { messages: ['create success'] } })
	}

	async updateOne(query: ClientGetOneRequest, body: ClientUpdateOneRequest) {
		await this.getOne(query)

		await this.clientRepository.updateOne(query, { ...body })

		return createResponse({ data: null, success: { messages: ['update success'] } })
	}
}
