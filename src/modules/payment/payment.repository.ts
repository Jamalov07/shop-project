import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared'
import {
	PaymentCreateOneRequest,
	PaymentDeleteOneRequest,
	PaymentFindManyRequest,
	PaymentFindOneRequest,
	PaymentGetManyRequest,
	PaymentGetOneRequest,
	PaymentUpdateOneRequest,
} from './interfaces'
import { PaymentController } from './payment.controller'

@Injectable()
export class PaymentRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: PaymentFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const payments = await this.prisma.paymentModel.findMany({
			where: {
				id: { in: query.ids },
				description: { contains: query.description, mode: 'insensitive' },
				clientId: query.clientId ? { in: [query.clientId] } : { not: null },
				client: { fullname: query.clientFullName },
				staffId: query.staffId,
				createdAt: {
					gte: query.startDate ? new Date(new Date(query.startDate).setHours(0, 0, 0, 0)) : undefined,
					lte: query.endDate ? new Date(new Date(query.endDate).setHours(23, 59, 59, 999)) : undefined,
				},
			},
			select: {
				id: true,
				description: true,
				other: true,
				card: true,
				cash: true,
				createdAt: true,
				client: { select: { id: true, createdAt: true, fullname: true, phone: true, deletedAt: true, updatedAt: true } },
				selling: { select: { id: true, createdAt: true, totalSum: true } },
				staff: { select: { id: true, createdAt: true, fullname: true, phone: true, deletedAt: true, updatedAt: true } },
			},
			...paginationOptions,
		})

		return payments
	}

	async findOne(query: PaymentFindOneRequest) {
		const payment = await this.prisma.paymentModel.findFirst({
			where: {
				id: query.id,
			},
			select: {
				id: true,
				description: true,
				other: true,
				card: true,
				cash: true,
				createdAt: true,
				client: { select: { id: true, createdAt: true, fullname: true, phone: true, deletedAt: true, updatedAt: true } },
				selling: { select: { id: true, createdAt: true, totalSum: true } },
				staff: { select: { id: true, createdAt: true, fullname: true, phone: true, deletedAt: true, updatedAt: true } },
			},
		})

		return payment
	}
	async countFindMany(query: PaymentFindManyRequest) {
		const paymentsCount = await this.prisma.paymentModel.count({
			where: {
				id: { in: query.ids },
				description: { contains: query.description, mode: 'insensitive' },
				clientId: query.clientId ? { in: [query.clientId] } : { not: null },
				client: { fullname: query.clientFullName },
				staffId: query.staffId,
				createdAt: {
					gte: query.startDate ? new Date(new Date(query.startDate).setHours(0, 0, 0, 0)) : undefined,
					lte: query.endDate ? new Date(new Date(query.endDate).setHours(23, 59, 59, 999)) : undefined,
				},
			},
		})

		return paymentsCount
	}

	async getMany(query: PaymentGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const payments = await this.prisma.paymentModel.findMany({
			where: {
				id: { in: query.ids },
				description: query.description,
				clientId: query.clientId ? { in: [query.clientId] } : { not: null },
				staffId: query.staffId,
			},
			...paginationOptions,
		})

		return payments
	}

	async getOne(query: PaymentGetOneRequest) {
		const payment = await this.prisma.paymentModel.findFirst({
			where: { id: query.id, description: query.description },
		})

		return payment
	}

	async countGetMany(query: PaymentGetManyRequest) {
		const paymentsCount = await this.prisma.paymentModel.count({
			where: {
				id: { in: query.ids },
				description: query.description,
				clientId: query.clientId ? { in: [query.clientId] } : { not: null },
				staffId: query.staffId,
			},
		})

		return paymentsCount
	}

	async createOne(body: PaymentCreateOneRequest) {
		const payment = await this.prisma.paymentModel.create({
			data: {
				description: body.description,
				clientId: body.clientId,
				other: body.other,
				cash: body.cash,
				card: body.card,
				staffId: body.staffId,
				sellingId: body.sellingId,
			},
		})
		return payment
	}

	// async createOnePro(body: PaymentCreateOneRequest, sellingId?: string) {
	// 	const payment = await this.createOne(body)

	// 	let notPayedsellings = await this.prisma.sellingModel.findMany({
	// 		where: { clientId: body.clientId, paymentCompleted: false, status: 'accepted' },
	// 		orderBy: [{ createdAt: 'asc' }],
	// 		select: { id: true, totalSum: true, paymentParts: true },
	// 	})
	// 	if (sellingId) {
	// 		const selling = await this.prisma.sellingModel.findFirst({
	// 			where: { id: sellingId },
	// 			select: { id: true, totalSum: true, paymentParts: true },
	// 		})
	// 		notPayedsellings = [selling, ...notPayedsellings]
	// 	}

	// 	if (notPayedsellings.length) {
	// 		let totalMoney = body.other

	// 		for (const selling of notPayedsellings) {
	// 			if (totalMoney) {
	// 				const qoldiq = selling.totalSum - selling.paymentParts.reduce((a, b) => a + b.sum, BigInt(0))

	// 				if (qoldiq > totalMoney) {
	// 					await this.prisma.paymentPartModel.createOne({ data: { paymentId: payment.id, sellingId: selling.id, sum: totalMoney } })
	// 					totalMoney = totalMoney - totalMoney
	// 				} else if (qoldiq === totalMoney) {
	// 					await this.prisma.paymentPartModel.createOne({ data: { paymentId: payment.id, sellingId: selling.id, sum: totalMoney } })
	// 					await this.prisma.sellingModel.update({ where: { id: selling.id }, data: { paymentCompleted: true } })
	// 					totalMoney = totalMoney - totalMoney
	// 				} else if (qoldiq < totalMoney) {
	// 					await this.prisma.paymentPartModel.createOne({ data: { paymentId: payment.id, sellingId: selling.id, sum: qoldiq } })
	// 					await this.prisma.sellingModel.update({ where: { id: selling.id }, data: { paymentCompleted: true } })
	// 					totalMoney = totalMoney - qoldiq
	// 				}
	// 			} else {
	// 				break
	// 			}
	// 		}
	// 	}
	// 	return payment
	// }

	async updateOne(query: PaymentGetOneRequest, body: PaymentUpdateOneRequest) {
		const payment = await this.prisma.paymentModel.update({
			where: { id: query.id },
			data: {
				description: body.description,
			},
		})

		return payment
	}

	async deleteOne(query: PaymentDeleteOneRequest) {
		const payment = await this.prisma.paymentModel.delete({
			where: { id: query.id },
		})

		return payment
	}

	async onModuleInit() {
		await this.prisma.createActionMethods(PaymentController)
	}
}
