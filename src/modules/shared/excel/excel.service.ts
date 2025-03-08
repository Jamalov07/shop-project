import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma'
import * as ExcelJS from 'exceljs'
import { Response } from 'express'
import * as fs from 'fs'
import * as path from 'path'
import { PaymentFindManyRequest } from '../../payment'
import { SellingFindManyRequest } from '../../selling'

@Injectable()
export class ExcelService {
	private readonly prisma: PrismaService

	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async exportProductsToExcel(response: Response) {
		// 1. Mahsulotlarni olish
		const products = await this.prisma.productModel.findMany()

		// 2. Excel Workbook yaratish
		const workbook = new ExcelJS.Workbook()
		const worksheet = workbook.addWorksheet('Products')

		// 3. Ustun nomlarini qo‘shish
		worksheet.columns = [
			{ header: 'ID', key: 'id', width: 42 },
			{ header: 'Name', key: 'name', width: 20 },
			{ header: 'Cost', key: 'cost', width: 15 },
			{ header: 'Price', key: 'price', width: 15 },
			{ header: 'Quantity', key: 'quantity', width: 10 },
			{ header: 'Warning Threshold', key: 'warningThreshold', width: 18 },
			{ header: 'Created At', key: 'createdAt', width: 40 },
			{ header: 'Updated At', key: 'updatedAt', width: 40 },
			{ header: 'Deleted At', key: 'deletedAt', width: 40 },
		]

		// 4. Ma'lumotlarni qo‘shish
		products.forEach((product) => {
			worksheet.addRow({
				id: product.id,
				name: product.name,
				cost: product.cost.toString(), // BigInt ni stringga o‘girish
				price: product.price.toString(),
				quantity: product.quantity,
				warningThreshold: product.warningThreshold,
				createdAt: product.createdAt.toISOString(),
				updatedAt: product.updatedAt.toISOString(),
				deletedAt: product.deletedAt?.toISOString() || null,
			})
		})

		// 5. Fayl nomini yaratish
		const fileName = `products_${Date.now()}.xlsx`
		const uploadDir = path.join(process.cwd(), 'uploads', 'files')
		const filePath = path.join(uploadDir, fileName)

		// 6. Faylni saqlash
		await workbook.xlsx.writeFile(filePath)

		// 7. Foydalanuvchiga yuklab olish uchun jo‘natish
		response.download(filePath, fileName, (err) => {
			if (err) {
				console.log(err)
				throw new Error('Faylni yuklab olishda xatolik yuz berdi')
			}
			// Faylni vaqtincha saqlash, keyin o‘chirish
			setTimeout(() => fs.unlinkSync(filePath), 5000)
		})
	}

	async exportPaymentsToExcel(query: PaymentFindManyRequest, res: Response) {
		// 🔹 1. Bazadan `PaymentModel` ma'lumotlarini olish
		const payments = await this.prisma.paymentModel.findMany({
			include: { staff: true, client: true, selling: true },
			where: {
				id: { in: query.ids },
				description: { contains: query.description, mode: 'insensitive' },
				clientId: query.clientId,
				client: { fullname: query.clientFullName },
				staffId: query.staffId,
				createdAt: {
					gte: query.startDate ? new Date(query.startDate) : undefined,
					lte: query.endDate ? new Date(query.endDate) : undefined,
				},
			},
		})

		// 🔹 2. Excel Workbook yaratish
		const workbook = new ExcelJS.Workbook()
		const worksheet = workbook.addWorksheet('Payments')

		// 🔹 3. Sarlavhalarni qo‘shish
		worksheet.columns = [
			{ header: 'ID', key: 'id', width: 42 },
			{ header: 'Cash', key: 'cash', width: 15 },
			{ header: 'Card', key: 'card', width: 15 },
			{ header: 'Other', key: 'other', width: 15 },
			{ header: 'Staff Name', key: 'staffName', width: 30 },
			{ header: 'Client Name', key: 'clientName', width: 30 },
			{ header: 'Selling ID', key: 'sellingId', width: 42 },
			{ header: 'Description', key: 'description', width: 30 },
			{ header: 'Created At', key: 'createdAt', width: 40 },
		]

		// 🔹 4. Ma'lumotlarni qo‘shish
		payments.forEach((payment) => {
			worksheet.addRow({
				id: payment.id,
				cash: payment.cash.toString(), // BigInt ni stringga o‘tkazish
				card: payment.card.toString(),
				other: payment.other.toString(),
				staffName: payment.staff?.fullname || 'N/A',
				clientName: payment.client?.fullname || 'N/A',
				sellingId: payment.sellingId || 'N/A',
				description: payment.description,
				createdAt: payment.createdAt.toISOString(),
			})
		})

		// 🔹 5. Fayl nomini yaratish
		const fileName = `payments_${Date.now()}.xlsx`
		const uploadDir = path.join(process.cwd(), 'uploads', 'files')
		const filePath = path.join(uploadDir, fileName)

		// 🔹 6. Faylni saqlash
		await workbook.xlsx.writeFile(filePath)

		// 🔹 7. Faylni foydalanuvchiga yuborish
		res.download(filePath, fileName, (err) => {
			if (err) {
				console.error('File download error:', err)
			}
			// Faylni o‘chirib tashlash (agar kerak bo‘lsa)
			setTimeout(() => fs.unlinkSync(filePath), 5000)
		})
	}

	async exportClientsToExcel(res: Response) {
		// 🔹 1. Bazadan `ClientModel` ma'lumotlarini olish
		const clients = await this.prisma.clientModel.findMany({
			include: { payments: true, sellings: true },
		})

		// 🔹 2. Excel Workbook yaratish
		const workbook = new ExcelJS.Workbook()
		const worksheet = workbook.addWorksheet('Clients')

		// 🔹 3. Sarlavhalarni qo‘shish
		worksheet.columns = [
			{ header: 'ID', key: 'id', width: 42 },
			{ header: 'Phone', key: 'phone', width: 15 },
			{ header: 'Full Name', key: 'fullname', width: 30 },
			{ header: 'Created At', key: 'createdAt', width: 40 },
			{ header: 'Total Payments', key: 'totalPayments', width: 20 },
			{ header: 'Total Sellings', key: 'totalSellings', width: 20 },
		]

		// 🔹 4. Ma'lumotlarni qo‘shish
		clients.forEach((client) => {
			worksheet.addRow({
				id: client.id,
				phone: client.phone,
				fullname: client.fullname,
				createdAt: client.createdAt.toISOString(),
				totalPayments: client.payments.length,
				totalSellings: client.sellings.length,
			})
		})

		// 🔹 5. Fayl nomini yaratish
		const fileName = `clients_${Date.now()}.xlsx`
		const uploadDir = path.join(process.cwd(), 'uploads', 'files')
		const filePath = path.join(uploadDir, fileName)

		// 🔹 6. Faylni saqlash
		await workbook.xlsx.writeFile(filePath)

		// 🔹 7. Faylni foydalanuvchiga yuborish
		res.download(filePath, fileName, (err) => {
			if (err) {
				console.error('File download error:', err)
			}
			// Faylni o‘chirib tashlash (agar kerak bo‘lsa)
			setTimeout(() => fs.unlinkSync(filePath), 5000)
		})
	}

	async exportSellingsToExcel(query: SellingFindManyRequest, res: Response) {
		const sellings = await this.prisma.sellingModel.findMany({
			where: {
				id: { in: query.ids },
				clientId: query.clientId,
				staffId: query.staffId,
				status: query.status,
				createdAt: {
					gte: query.startDate ? new Date(query.startDate) : undefined,
					lte: query.endDate ? new Date(query.endDate) : undefined,
				},
			},
			include: {
				staff: true,
				client: true,
				payments: true,
				products: true,
			},
		})

		const workbook = new ExcelJS.Workbook()
		const worksheet = workbook.addWorksheet('Sellings')

		// Sarlavha qo‘shish
		worksheet.columns = [
			{ header: 'ID', key: 'id', width: 42 },
			{ header: 'Status', key: 'status', width: 15 },
			{ header: 'Staff ID', key: 'staffId', width: 42 },
			{ header: 'Client ID', key: 'clientId', width: 42 },
			{ header: 'Total Sum', key: 'totalSum', width: 20 },
			{ header: 'Created At', key: 'createdAt', width: 40 },
		]

		// Ma'lumotlarni qo‘shish
		sellings.forEach((selling) => {
			worksheet.addRow({
				id: selling.id,
				status: selling.status,
				staffId: selling.staffId,
				clientId: selling.clientId,
				totalSum: selling.totalSum.toString(), // BigInt ni stringga o‘tkazamiz
				createdAt: selling.createdAt.toISOString(),
			})
		})

		// 🔹 5. Fayl nomini yaratish
		const fileName = `sellings_${Date.now()}.xlsx`
		const uploadDir = path.join(process.cwd(), 'uploads', 'files')
		const filePath = path.join(uploadDir, fileName)

		// 🔹 6. Faylni saqlash
		await workbook.xlsx.writeFile(filePath)

		// 🔹 7. Faylni foydalanuvchiga yuborish
		res.download(filePath, fileName, (err) => {
			if (err) {
				console.error('File download error:', err)
			}
			// Faylni o‘chirib tashlash (agar kerak bo‘lsa)
			setTimeout(() => fs.unlinkSync(filePath), 5000)
		})
	}
}
