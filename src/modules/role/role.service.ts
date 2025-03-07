import { BadRequestException, Injectable } from '@nestjs/common'
import { RoleRepository } from './role.repository'
import { createResponse } from '@common'
import { RoleGetOneRequest, RoleCreateOneRequest, RoleUpdateOneRequest, RoleGetManyRequest, RoleFindManyRequest, RoleFindOneRequest } from './interfaces'

@Injectable()
export class RoleService {
	private readonly roleRepository: RoleRepository

	constructor(roleRepository: RoleRepository) {
		this.roleRepository = roleRepository
	}

	async findMany(query: RoleFindManyRequest) {
		const roles = await this.roleRepository.findMany(query)
		const rolesCount = await this.roleRepository.countFindMany(query)

		const result = query.pagination ? { totalCount: rolesCount, pagesCount: Math.ceil(rolesCount / query.pageSize), pageSize: roles.length, data: roles } : roles

		return createResponse({ data: result, success: { messages: ['find many success'] } })
	}

	async findOne(query: RoleFindOneRequest) {
		const role = await this.roleRepository.findOne(query)

		if (!role) {
			throw new BadRequestException('role not found')
		}

		return createResponse({ data: role, success: { messages: ['find one success'] } })
	}

	async getMany(query: RoleGetManyRequest) {
		const roles = await this.roleRepository.getMany(query)
		const rolesCount = await this.roleRepository.countGetMany(query)

		const result = query.pagination ? { pagesCount: Math.ceil(rolesCount / query.pageSize), pageSize: roles.length, data: roles } : roles

		return createResponse({ data: result, success: { messages: ['get many success'] } })
	}

	async getOne(query: RoleGetOneRequest) {
		const role = await this.roleRepository.getOne(query)

		if (!role) {
			throw new BadRequestException('role not found')
		}

		return createResponse({ data: role, success: { messages: ['get one success'] } })
	}

	async createOne(body: RoleCreateOneRequest) {
		const candidate = await this.roleRepository.getOne({ name: body.name })
		if (candidate) {
			throw new BadRequestException('name already exists')
		}

		await this.roleRepository.createOne({ ...body })

		return createResponse({ data: null, success: { messages: ['create success'] } })
	}

	async updateOne(query: RoleGetOneRequest, body: RoleUpdateOneRequest) {
		await this.getOne(query)

		const candidate = await this.roleRepository.getOne({ name: body.name })
		if (candidate && candidate.id !== query.id) {
			throw new BadRequestException('name already exists')
		}

		await this.roleRepository.updateOne(query, { ...body })

		return createResponse({ data: null, success: { messages: ['update success'] } })
	}

	async deleteOne(query: RoleGetOneRequest) {
		await this.getOne(query)

		await this.roleRepository.deleteOne(query)

		return createResponse({ data: null, success: { messages: ['delete success'] } })
	}
}
