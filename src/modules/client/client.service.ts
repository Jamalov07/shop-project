import { BadRequestException, Injectable } from '@nestjs/common'
import { ClientRepository } from './client.repository'
import { createResponse } from '@common'
import {
	ClientGetOneRequest,
	ClientCreateOneRequest,
	ClientUpdateOneRequest,
	ClientGetManyRequest,
	ClientFindManyRequest,
	ClientFindOneRequest,
	ClientDeleteOneRequest,
} from './interfaces'

@Injectable()
export class ClientService {
	private readonly clientRepository: ClientRepository

	constructor(clientRepository: ClientRepository) {
		this.clientRepository = clientRepository
	}

	async findMany(query: ClientFindManyRequest) {
		const clients = (await this.clientRepository.findMany({ ...query, isDeleted: false })).map((c) => {
			const totalSums = c.sellings.reduce((a, b) => a + b.totalSum, BigInt(0))
			const payedSums = c.sellings.reduce((a, b) => a + b.payments.reduce((c, d) => c + d.other, BigInt(0)), BigInt(0))
			return { ...c, debt: totalSums - payedSums, lastSellingDate: c.sellings[0]?.createdAt ?? null }
		})
		const clientsCount = await this.clientRepository.countFindMany(query)

		const result = query.pagination
			? {
					totalCount: clientsCount,
					pagesCount: Math.ceil(clientsCount / query.pageSize),
					pageSize: clients.length,
					data: clients,
				}
			: { data: clients }

		return createResponse({ data: result, success: { messages: ['find many success'] } })
	}

	async findOne(query: ClientFindOneRequest) {
		const client = await this.clientRepository.findOne(query)

		if (!client) {
			throw new BadRequestException('client not found')
		}
		const totalSums = client.sellings.reduce((a, b) => a + b.totalSum, BigInt(0))
		const payedSums = client.sellings.reduce((a, b) => a + b.payments.reduce((c, d) => c + d.other, BigInt(0)), BigInt(0))

		return createResponse({
			data: { ...client, debt: totalSums - payedSums, lastSellingDate: client.sellings[0].createdAt ?? null },
			success: { messages: ['find one success'] },
		})
	}

	async getMany(query: ClientGetManyRequest) {
		const clients = await this.clientRepository.getMany(query)
		const clientsCount = await this.clientRepository.countGetMany(query)

		const result = query.pagination
			? {
					pagesCount: Math.ceil(clientsCount / query.pageSize),
					pageSize: clients.length,
					data: clients,
				}
			: { data: clients }

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

		return createResponse({ data: null, success: { messages: ['create one success'] } })
	}

	async updateOne(query: ClientGetOneRequest, body: ClientUpdateOneRequest) {
		await this.getOne(query)

		await this.clientRepository.updateOne(query, { ...body })

		return createResponse({ data: null, success: { messages: ['update one success'] } })
	}

	async deleteOne(query: ClientDeleteOneRequest) {
		await this.getOne(query)
		if (query.method === 'hard') {
			// await this.clientRepository.deleteOne(query)
		} else {
			await this.clientRepository.updateOne(query, { deletedAt: new Date() })
		}
		return createResponse({ data: null, success: { messages: ['delete one success'] } })
	}
}
