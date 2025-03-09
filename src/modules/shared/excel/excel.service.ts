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
		// 🔹 1. Mahsulotlarni olish
		const products = await this.prisma.productModel.findMany()

		// 🔹 2. Excel Workbook yaratish
		const workbook = new ExcelJS.Workbook()
		const worksheet = workbook.addWorksheet('Mahsulotlar')

		// 🔹 3. Ustun nomlarini qo‘shish (o‘zbekcha)
		worksheet.columns = [
			{ header: 'Mahsulot nomi', key: 'name', width: 40 }, // 🔹 Nom uzunligi kattaroq
			{ header: 'Narxi (so‘m)', key: 'price', width: 15 },
			{ header: 'Tannarxi (so‘m)', key: 'cost', width: 15 },
			{ header: 'Miqdori', key: 'quantity', width: 10 },
			{ header: 'Ogohlantirish miqdori', key: 'warningThreshold', width: 18 },
			{ header: 'Yaratilgan sana', key: 'createdAt', width: 20 },
			{ header: 'Yangilangan sana', key: 'updatedAt', width: 20 },
			{ header: 'O‘chirilgan sana', key: 'deletedAt', width: 20 },
		]

		// 🔹 4. Headerlarni qalin qilish va qotib qo‘yish
		worksheet.getRow(1).font = { bold: true }
		worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' }
		worksheet.views = [{ state: 'frozen', ySplit: 1 }] // 🔹 Header harakatlanmasdan qotib turadi

		// 🔹 5. Ma'lumotlarni qo‘shish
		products.forEach((product) => {
			worksheet.addRow({
				name: product.name,
				price: product.price.toString(),
				cost: product.cost.toString(),
				quantity: product.quantity,
				warningThreshold: product.warningThreshold,
				createdAt: new Date(product.createdAt).toLocaleDateString('uz-UZ'), // 🔹 Sana formatini o‘zgartirish
				updatedAt: new Date(product.updatedAt).toLocaleDateString('uz-UZ'),
				deletedAt: product.deletedAt ? new Date(product.deletedAt).toLocaleDateString('uz-UZ') : 'N/A',
			})
		})

		// 🔹 6. Fayl nomini yaratish
		const fileName = `mahsulotlar_${Date.now()}.xlsx`
		const uploadDir = path.join(process.cwd(), 'uploads', 'files')
		const filePath = path.join(uploadDir, fileName)

		// 🔹 7. Faylni saqlash
		await workbook.xlsx.writeFile(filePath)

		// 🔹 8. Foydalanuvchiga yuklab olish uchun jo‘natish
		response.download(filePath, fileName, (err) => {
			if (err) {
				console.log(err)
				throw new Error('Faylni yuklab olishda xatolik yuz berdi')
			}
			// 🔹 Faylni vaqtincha saqlash, keyin o‘chirish
			setTimeout(() => fs.unlinkSync(filePath), 5000)
		})
	}

	async exportPaymentsToExcel(query: PaymentFindManyRequest, res: Response) {
		// 🔹 1. Bazadan ma'lumotlarni olish
		const payments = await this.prisma.paymentModel.findMany({
			include: { staff: true, client: true, selling: true },
			where: {
				id: { in: query.ids },
				description: { contains: query.description, mode: 'insensitive' },
				clientId: query.clientId,
				client: { fullname: query.clientFullName },
				staffId: query.staffId,
				createdAt: {
					gte: query.startDate ? new Date(new Date(query.startDate).setHours(0, 0, 0, 0)) : undefined,
					lte: query.endDate ? new Date(new Date(query.endDate).setHours(23, 59, 59, 999)) : undefined,
				},
			},
		})

		// 🔹 2. Excel Workbook yaratish
		const workbook = new ExcelJS.Workbook()
		const worksheet = workbook.addWorksheet('To‘lovlar')

		// 🔹 3. Sarlavhalarni qo‘shish
		worksheet.columns = [
			{ header: 'Mijoz ismi', key: 'clientName', width: 30 },
			{ header: 'Telefon raqami', key: 'clientPhone', width: 20 },
			{ header: 'Naqd (so‘m)', key: 'cash', width: 15 },
			{ header: 'Karta (so‘m)', key: 'card', width: 15 },
			{ header: 'Boshqa (so‘m)', key: 'other', width: 15 },
			{ header: 'Xodim ismi', key: 'staffName', width: 30 },
			{ header: 'Savdo ID', key: 'sellingId', width: 20 },
			{ header: 'Izoh', key: 'description', width: 30 },
			{ header: 'Yaratilgan sana', key: 'createdAt', width: 20 },
		]

		// 🔹 4. Header qalin qilish va qotib qo‘yish
		worksheet.getRow(1).font = { bold: true }
		worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' }
		worksheet.views = [{ state: 'frozen', ySplit: 1 }] // Header qotib turadi

		// 🔹 5. Ma'lumotlarni qo‘shish
		payments.forEach((payment) => {
			worksheet.addRow({
				clientName: payment.client?.fullname || 'N/A',
				clientPhone: payment.client?.phone || 'N/A',
				cash: payment.cash.toString(),
				card: payment.card.toString(),
				other: payment.other.toString(),
				staffName: payment.staff?.fullname || 'N/A',
				sellingId: payment.sellingId || 'N/A',
				description: payment.description,
				createdAt: new Date(payment.createdAt).toLocaleDateString('uz-UZ'), // Sana formatini to‘g‘rilash
			})
		})

		// 🔹 6. Fayl nomini yaratish
		const fileName = `tolovlar_${Date.now()}.xlsx`
		const uploadDir = path.join(process.cwd(), 'uploads', 'files')
		const filePath = path.join(uploadDir, fileName)

		// 🔹 7. Faylni saqlash
		await workbook.xlsx.writeFile(filePath)

		// 🔹 8. Faylni foydalanuvchiga yuborish
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
					gte: query.startDate ? new Date(new Date(query.startDate).setHours(0, 0, 0, 0)) : undefined,
					lte: query.endDate ? new Date(new Date(query.endDate).setHours(23, 59, 59, 999)) : undefined,
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
