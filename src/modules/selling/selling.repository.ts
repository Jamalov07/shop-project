import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared'
import {
	SellingCreateOneRequest,
	SellingDeleteOneRequest,
	SellingFindManyRequest,
	SellingFindOneRequest,
	SellingGetManyRequest,
	SellingGetOneRequest,
	SellingGetPeriodStatsRequest,
	SellingUpdateOneRequest,
} from './interfaces'
import { SellingController } from './selling.controller'
import { SellingStatusEnum } from '@prisma/client'
import * as moment from 'moment-timezone'

@Injectable()
export class SellingRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: SellingFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const sellings = await this.prisma.sellingModel.findMany({
			where: {
				id: { in: query.ids },
				clientId: query.clientId,
				staffId: query.staffId,
				status: query.status,
				createdAt: {
					gte: query.startDate ? new Date(new Date(query.startDate).setHours(0, 0, 0, 0)) : undefined,
					lte: query.endDate ? new Date(new Date(query.endDate).setHours(23, 59, 59, 999)) : undefined,
				},
			},
			...paginationOptions,
		})

		return sellings
	}

	async findOne(query: SellingFindOneRequest) {
		const selling = await this.prisma.sellingModel.findFirst({
			where: {
				id: query.id,
			},
		})

		return selling
	}

	async countFindMany(query: SellingFindManyRequest) {
		const sellingsCount = await this.prisma.sellingModel.count({
			where: {
				id: { in: query.ids },
				clientId: query.clientId,
				staffId: query.staffId,
				status: query.status,
				createdAt: {
					gte: query.startDate ? new Date(new Date(query.startDate).setHours(0, 0, 0, 0)) : undefined,
					lte: query.endDate ? new Date(new Date(query.endDate).setHours(23, 59, 59, 999)) : undefined,
				},
			},
		})

		return sellingsCount
	}

	async getMany(query: SellingGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const sellings = await this.prisma.sellingModel.findMany({
			where: {
				id: { in: query.ids },
				clientId: query.clientId,
				staffId: query.staffId,
				status: query.status,
				createdAt: {
					gte: query.startDate ? new Date(new Date(query.startDate).setHours(0, 0, 0, 0)) : undefined,
					lte: query.endDate ? new Date(new Date(query.endDate).setHours(23, 59, 59, 999)) : undefined,
				},
			},
			include: { payments: true },
			...paginationOptions,
		})

		return sellings
	}

	async getOne(query: SellingGetOneRequest) {
		const selling = await this.prisma.sellingModel.findFirst({
			where: { id: query.id },
		})

		return selling
	}

	async countGetMany(query: SellingGetManyRequest) {
		const sellingsCount = await this.prisma.sellingModel.count({
			where: {
				id: { in: query.ids },
				clientId: query.clientId,
				staffId: query.staffId,
				status: query.status,
			},
		})

		return sellingsCount
	}

	async getPeriodStats(query: SellingGetPeriodStatsRequest) {
		if (query.type === 'day') {
			return this.getDayStats()
		} else if (query.type === 'week') {
			return this.getWeekStats()
		} else if (query.type === 'month') {
			return this.getMonthStats()
		} else if (query.type === 'year') {
			return this.getYearStats()
		}
	}

	async createOne(body: SellingCreateOneRequest) {
		const selling = await this.prisma.sellingModel.create({
			data: {
				clientId: body.clientId,
				staffId: body.staffId,
				totalSum: body.totalSum,
				status: SellingStatusEnum.accepted,
				products: { createMany: { data: body.products.map((p) => ({ quantity: p.quantity, productStorehouseId: p.id })) } },
			},
		})
		return selling
	}

	async updateOne(query: SellingGetOneRequest, body: SellingUpdateOneRequest) {
		const selling = await this.prisma.sellingModel.update({
			where: { id: query.id },
			data: {
				status: body.status,
				totalSum: body.totalSum,
				createdAt: body.status === 'accepted' ? new Date() : undefined,
			},
		})

		return selling
	}

	async deleteOne(query: SellingDeleteOneRequest) {
		const selling = await this.prisma.sellingModel.delete({
			where: { id: query.id },
		})

		return selling
	}

	async onModuleInit() {
		await this.prisma.createActionMethods(SellingController)
	}

	private async getDayStats() {
		const now = new Date(new Date().setHours(new Date().getHours() + 5))
		console.log('bu now', now)
		let startDate: Date
		let endDate: Date
		let dateFormat: (date: Date) => string

		startDate = new Date(new Date().setHours(0 + 5, 0, 0, 0))
		endDate = new Date(now.setHours(now.getHours() + 5, 59, 59, 999))
		dateFormat = (date) => date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

		const salesByHour = []
		for (let hour = 0; hour < endDate.getHours() - 4; hour++) {
			const hourStart = new Date(startDate)
			hourStart.setHours(hour, 0, 0, 0)
			const hourEnd = new Date(startDate)
			hourEnd.setHours(hour, 59, 59, 999)

			const sales = await this.prisma.sellingModel.findMany({
				where: {
					createdAt: { gte: hourStart, lte: hourEnd },
				},
			})

			const totalSum = sales.reduce((sum, sale) => sum + sale.totalSum, BigInt(0))
			salesByHour.push({
				date: dateFormat(hourStart),
				sum: totalSum.toString(),
			})
		}
		return salesByHour
	}

	// private async oldgetDayStats() {
	// 	const now = new Date(new Date().setHours(new Date().getHours() + 5))
	// 	let startDate: Date
	// 	let endDate: Date
	// 	let dateFormat: (date: Date) => string

	// 	startDate = new Date(now.setHours(0 + 5, 0, 0, 0))
	// 	endDate = new Date(now.setHours(23, 59, 59, 999))
	// 	dateFormat = (date) => date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

	// 	const salesByHour = []
	// 	for (let hour = 0; hour < 24; hour++) {
	// 		const hourStart = new Date(startDate)
	// 		hourStart.setHours(hour, 0, 0, 0)
	// 		const hourEnd = new Date(startDate)
	// 		hourEnd.setHours(hour, 59, 59, 999)

	// 		const sales = await this.prisma.sellingModel.findMany({
	// 			where: {
	// 				createdAt: { gte: hourStart, lte: hourEnd },
	// 			},
	// 		})

	// 		const totalSum = sales.reduce((sum, sale) => sum + sale.totalSum, BigInt(0))
	// 		salesByHour.push({
	// 			date: dateFormat(hourStart),
	// 			sum: totalSum.toString(),
	// 		})
	// 	}
	// 	return salesByHour
	// }

	// async oldgetWeekStats() {
	// 	const now = new Date(new Date().setHours(new Date().getHours() + 5))
	// 	let startDate: Date
	// 	let endDate: Date
	// 	let dateFormat: (date: Date) => string

	// 	const currentDay = now.getDay()
	// 	startDate = new Date(now)
	// 	if (currentDay === 0) {
	// 		startDate.setDate(startDate.getDate() - 6)
	// 	} else {
	// 		startDate.setDate(startDate.getDate() - (currentDay - 1))
	// 	}
	// 	startDate = new Date(startDate.setHours(0 + 5, 0, 0, 0))

	// 	endDate = new Date(startDate)
	// 	endDate.setDate(startDate.getDate() + 6)
	// 	endDate.setHours(23, 59, 59, 999)

	// 	dateFormat = (date) => date.toISOString().split('T')[0]

	// 	const salesByDay = []
	// 	for (let day = 0; day < 7; day++) {
	// 		const dayStart = new Date(startDate)
	// 		dayStart.setDate(startDate.getDate() + day)
	// 		const dayEnd = new Date(dayStart)
	// 		dayEnd.setHours(23, 59, 59, 999)

	// 		const sales = await this.prisma.sellingModel.findMany({
	// 			where: {
	// 				createdAt: { gte: dayStart, lte: dayEnd },
	// 			},
	// 		})

	// 		const totalSum = sales.reduce((sum, sale) => sum + sale.totalSum, BigInt(0))
	// 		salesByDay.push({
	// 			date: dateFormat(dayStart),
	// 			sum: totalSum.toString(),
	// 		})
	// 	}
	// 	return salesByDay
	// }

	async getWeekStats() {
		const now = new Date(new Date().setHours(new Date().getHours() + 5))
		let startDate: Date
		let endDate: Date
		let dateFormat: (date: Date) => string

		startDate = new Date(new Date(new Date().setDate(now.getDate() - 6)).setHours(0 + 5, 0, 0, 0))

		endDate = new Date(now)
		endDate.setHours(23 + 5, 59, 59, 999)

		dateFormat = (date) => date.toISOString().split('T')[0]

		const salesByDay = []
		for (let day = 0; day < 7; day++) {
			const dayStart = new Date(startDate.setHours(0 + 5, 0, 0, 0))
			dayStart.setDate(startDate.getDate() + day)
			const dayEnd = new Date(dayStart)
			dayEnd.setHours(23 + 5, 59, 59, 999)

			const sales = await this.prisma.sellingModel.findMany({
				where: {
					createdAt: { gte: dayStart, lte: dayEnd },
				},
			})

			const totalSum = sales.reduce((sum, sale) => sum + sale.totalSum, BigInt(0))
			salesByDay.push({
				date: dateFormat(dayStart),
				sum: totalSum.toString(),
			})
		}
		return salesByDay
	}

	// async oldgetWeekStats() {
	// 	const now = new Date(new Date().setHours(new Date().getHours() + 5))
	// 	let startDate: Date
	// 	let endDate: Date
	// 	let dateFormat: (date: Date) => string

	// 	const currentDay = now.getDay()
	// 	startDate = new Date(now)
	// 	if (currentDay === 0) {
	// 		startDate.setDate(startDate.getDate() - 6)
	// 	} else {
	// 		startDate.setDate(startDate.getDate() - (currentDay - 1))
	// 	}
	// 	startDate = new Date(startDate.setHours(0 + 5, 0, 0, 0))

	// 	endDate = new Date(startDate)
	// 	endDate.setDate(startDate.getDate() + 6)
	// 	endDate.setHours(23, 59, 59, 999)

	// 	dateFormat = (date) => date.toISOString().split('T')[0]

	// 	const salesByDay = []
	// 	for (let day = 0; day < 7; day++) {
	// 		const dayStart = new Date(startDate)
	// 		dayStart.setDate(startDate.getDate() + day)
	// 		const dayEnd = new Date(dayStart)
	// 		dayEnd.setHours(23, 59, 59, 999)

	// 		const sales = await this.prisma.sellingModel.findMany({
	// 			where: {
	// 				createdAt: { gte: dayStart, lte: dayEnd },
	// 			},
	// 		})

	// 		const totalSum = sales.reduce((sum, sale) => sum + sale.totalSum, BigInt(0))
	// 		salesByDay.push({
	// 			date: dateFormat(dayStart),
	// 			sum: totalSum.toString(),
	// 		})
	// 	}
	// 	return salesByDay
	// }

	async getMonthStats() {
		const now = new Date(new Date().setHours(new Date().getHours() + 5))
		let startDate: Date
		let endDate: Date
		let dateFormat: (date: Date) => string

		startDate = new Date(now.getFullYear(), now.getMonth(), 1, 0 + 5, 0, 0, 0)
		endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
		dateFormat = (date) => date.toISOString().split('T')[0]

		const salesByDay = []
		for (let day = 1; day <= endDate.getDate(); day++) {
			const dayStart = new Date(startDate)
			dayStart.setDate(day)
			const dayEnd = new Date(dayStart)
			dayEnd.setHours(23, 59, 59, 999)

			const sales = await this.prisma.sellingModel.findMany({
				where: {
					createdAt: { gte: dayStart, lte: dayEnd },
				},
			})

			const totalSum = sales.reduce((sum, sale) => sum + sale.totalSum, BigInt(0))
			salesByDay.push({
				date: dateFormat(dayStart),
				sum: totalSum.toString(),
			})
		}
		return salesByDay
	}

	// async oldgetYearStats() {
	// 	const now = new Date(new Date().setHours(new Date().getHours() + 5))
	// 	let startDate: Date
	// 	let endDate: Date
	// 	let dateFormat: (date: Date) => string

	// 	startDate = new Date(now.getFullYear(), 0, 1, 0 + 5, 0, 0, 0)
	// 	endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999)

	// 	dateFormat = (date) => date.toISOString().split('T')[0].slice(0, 7)

	// 	const salesByMonth = []
	// 	for (let month = 0; month < 12; month++) {
	// 		const monthStart = new Date(startDate.getFullYear(), month, 1, 0 + 5, 0, 0, 0)
	// 		const monthEnd = new Date(startDate.getFullYear(), month + 1, 0, 23, 59, 59, 999)

	// 		const sales = await this.prisma.sellingModel.findMany({
	// 			where: {
	// 				createdAt: { gte: monthStart, lte: monthEnd },
	// 			},
	// 		})

	// 		const totalSum = sales.reduce((sum, sale) => sum + sale.totalSum, BigInt(0))
	// 		salesByMonth.push({
	// 			date: dateFormat(monthStart),
	// 			sum: totalSum.toString(),
	// 		})
	// 	}
	// 	return salesByMonth
	// }

	async getYearStats() {
		const now = new Date(new Date().setHours(new Date().getHours() + 5))
		let startDate: Date
		let endDate: Date
		let dateFormat: (date: Date) => string

		startDate = new Date(now.getFullYear(), 0, 1, 0 + 5, 0, 0, 0)
		endDate = new Date(now.getFullYear(), 11, 31, 23 + 5, 59, 59, 999)

		dateFormat = (date) => date.toISOString().split('T')[0].slice(0, 7)

		const salesByMonth = []
		for (let month = 0; month < 12; month++) {
			const monthStart = new Date(startDate.getFullYear(), month, 1, 0 + 5, 0, 0, 0)
			const monthEnd = new Date(startDate.getFullYear(), month + 1, 0, 23 + 5, 59, 59, 999)

			const sales = await this.prisma.sellingModel.findMany({
				where: {
					createdAt: { gte: monthStart, lte: monthEnd },
				},
			})

			const totalSum = sales.reduce((sum, sale) => sum + sale.totalSum, BigInt(0))
			salesByMonth.push({
				date: dateFormat(monthStart),
				sum: totalSum.toString(),
			})
		}
		return salesByMonth
	}
}
