import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaService } from '@shared'
import {
	StaffGetOneRequest,
	StaffCreateOneRequest,
	StaffCreateManyRequest,
	StaffUpdateOneRequest,
	StaffUpdateManyRequest,
	StaffDeleteOneRequest,
	StaffDeleteManyRequest,
	StaffGetManyRequest,
	StaffFindOneRequest,
	StaffFindManyRequest,
} from './interfaces'
import { deletedAtConverter } from '@common'
import { StaffController } from './staff.controller'

@Injectable()
export class StaffRepository implements OnModuleInit {
	private readonly prisma: PrismaService

	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: StaffFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const staffs = await this.prisma.staffModel.findMany({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				phone: { not: process.env.STAFF_PHONE, contains: query.phone, mode: 'insensitive' },
				fullname: { contains: query.fullname, mode: 'insensitive' },
			},
			...paginationOptions,
		})

		return staffs
	}

	async findOne(query: StaffFindOneRequest) {
		const staff = await this.prisma.staffModel.findFirst({
			where: {
				id: query.id,
				deletedAt: deletedAtConverter(query.isDeleted),
				phone: { not: process.env.STAFF_PHONE, contains: query.phone, mode: 'insensitive' },
				fullname: { contains: query.fullname, mode: 'insensitive' },
			},
			select: { id: true, createdAt: true, deletedAt: true, token: true, fullname: true, phone: true, updatedAt: true, actions: { select: { id: true } } },
		})

		return staff
	}

	async countFindMany(query: StaffFindManyRequest) {
		const staffsCount = await this.prisma.staffModel.count({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				phone: { not: process.env.STAFF_PHONE, contains: query.phone, mode: 'insensitive' },
				fullname: { contains: query.fullname, mode: 'insensitive' },
			},
		})

		return staffsCount
	}

	async getMany(query: StaffGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const staffs = await this.prisma.staffModel.findMany({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				phone: { not: process.env.STAFF_PHONE, contains: query.phone },
				fullname: query.fullname,
			},
			...paginationOptions,
		})

		return staffs
	}

	async getOne(query: StaffGetOneRequest) {
		const staff = await this.prisma.staffModel.findFirst({
			where: {
				id: query.id,
				phone: { not: process.env.STAFF_PHONE, contains: query.phone },
				fullname: query.fullname,
				token: query.token,
				deletedAt: deletedAtConverter(query.isDeleted),
			},
		})

		return staff
	}

	async countGetMany(query: StaffGetManyRequest) {
		const staffsCount = await this.prisma.staffModel.count({
			where: {
				id: { in: query.ids },
				phone: { not: process.env.STAFF_PHONE, contains: query.phone },
				fullname: query.fullname,
				deletedAt: deletedAtConverter(query.isDeleted),
			},
		})

		return staffsCount
	}

	async createOne(body: StaffCreateOneRequest) {
		const staff = await this.prisma.staffModel.create({
			data: {
				phone: body.phone,
				fullname: body.fullname,
				password: body.password,
				actions: { connect: body.actionsToConnect.map((a) => ({ id: a })) },
			},
		})
		return staff
	}

	async createMany(body: StaffCreateManyRequest) {
		const staffs = await this.prisma.staffModel.createMany({
			data: body.datas.map((u) => ({
				phone: u.phone,
				fullname: u.fullname,
				password: u.password,
			})),
		})

		return staffs
	}

	async updateOne(query: StaffGetOneRequest, body: StaffUpdateOneRequest) {
		const staff = await this.prisma.staffModel.update({
			where: { id: query.id },
			data: {
				phone: body.phone,
				fullname: body.fullname,
				password: body.password,
				deletedAt: body.deletedAt,
				token: body.token,
				actions: {
					connect: body?.actionsToConnect?.map((a) => ({ id: a })),
					disconnect: body?.actionsToDisconnect?.map((a) => ({ id: a })),
				},
			},
		})

		return staff
	}

	async updateMany(body: StaffUpdateManyRequest) {
		const staffs = await this.prisma.staffModel.updateMany({
			where: { id: { in: body.ids } },
			data: { deletedAt: body.deletedAt },
		})

		return staffs
	}

	async deleteOne(query: StaffDeleteOneRequest) {
		const staff = await this.prisma.staffModel.delete({
			where: { id: query.id },
		})
		return staff
	}

	async deleteMany(query: StaffDeleteManyRequest) {
		const staffs = await this.prisma.staffModel.deleteMany({
			where: { id: { in: query.ids } },
		})
		return staffs
	}

	async onModuleInit() {
		await this.prisma.createActionMethods(StaffController)
	}
}
