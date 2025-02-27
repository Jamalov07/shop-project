import type { OnModuleInit, OnModuleDestroy, Type } from '@nestjs/common'
import { Global, Injectable, RequestMethod } from '@nestjs/common'
import { Controller } from '@nestjs/common/interfaces'
import { ConfigService } from '@nestjs/config'
import { ActionMethodEnum, PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

@Global()
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	private readonly config: ConfigService
	constructor(config: ConfigService) {
		super({ datasources: { db: { url: config.getOrThrow<string>('database.url') } } })
		this.config = config

		this.$use(async (params, next) => {
			// console.log(params)
			if (['findMany', 'findFirst'].includes(params.action) && !['ActionModel'].includes(params.model)) {
				if (!params.args.orderBy) {
					params.args.orderBy = [{ createdAt: 'desc' }]
				} else {
					params.args.orderBy.push({ createdAt: 'desc' })
				}
				// if (!params.args.where.deletedAt) {
				// 	params.args.where.deletedAt = null
				// }
			}

			return next(params)
		})
	}

	async createActionMethods(controller: Type<Controller>) {
		const controllerPrototype = controller.prototype

		const baseRoute = Reflect.getMetadata('path', controller) || ''
		const otpMethods = Object.getOwnPropertyNames(controllerPrototype)
			.filter((method) => method !== 'constructor')
			.map((method) => {
				const route = Reflect.getMetadata('path', controllerPrototype[method])
				const methodType: ActionMethodEnum = Reflect.getMetadata('method', controllerPrototype[method])
				const fullRoute = `${baseRoute}/${route || ''}`.replace(/\/+/g, '/')
				return {
					method: RequestMethod[methodType].toLowerCase(),
					url: fullRoute,
					name: method,
				}
			})
		await this.actionModel.createMany({ data: otpMethods, skipDuplicates: true })
	}

	async signInStaff() {
		const payload = {
			phone: this.config.get('STAFF_PHONE'),
			fullname: this.config.get('STAFF_FULLNAME'),
			password: await bcrypt.hash(this.config.get('STAFF_PASSWORD'), 7),
		}

		const actions = await this.actionModel.findMany({})

		const staff = await this.staffModel.findFirst({ where: { ...payload, password: undefined } })
		if (!staff) {
			const role = await this.roleModel.findFirst({ where: { name: this.config.get('STAFF_ROLE') } })

			if (role) {
				await this.roleModel.update({ where: { id: role.id }, data: { permissions: { createMany: { data: actions.map((a) => ({ actionId: a.id })), skipDuplicates: true } } } })
			} else {
				await this.roleModel.create({
					data: { name: this.config.get('STAFF_ROLE'), permissions: { createMany: { data: actions.map((a) => ({ actionId: a.id })), skipDuplicates: true } } },
				})
			}
			const staff = await this.staffModel.create({
				data: { ...payload, roles: { connect: [{ id: role.id }] } },
			})

			console.log('created:', staff.id)
		} else {
			const compare = await bcrypt.compare(this.config.get('STAFF_PASSWORD'), staff.password)
			if (!compare) {
				const role = await this.roleModel.findFirst({ where: { name: this.config.get('STAFF_ROLE') } })

				if (role) {
					await this.roleModel.update({ where: { id: role.id }, data: { permissions: { createMany: { data: actions.map((a) => ({ actionId: a.id })), skipDuplicates: true } } } })
				} else {
					await this.roleModel.create({
						data: { name: this.config.get('STAFF_ROLE'), permissions: { createMany: { data: actions.map((a) => ({ actionId: a.id })), skipDuplicates: true } } },
					})
				}
				await this.staffModel.update({
					where: { id: staff.id },
					data: { password: payload.password, roles: { connect: [{ id: role.id }] } },
				})
				console.log('updated:', staff.id)
			} else {
				console.log('exists:', staff.id)
			}
		}
	}

	async onModuleInit() {
		await this.$connect()
		await this.signInStaff()
	}

	async onModuleDestroy() {
		await this.$disconnect()
	}
}
