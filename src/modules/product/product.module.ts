import { BadRequestException, Module } from '@nestjs/common'
import { PrismaModule } from '../shared'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'
import { ProductRepository } from './product.repository'
import { MulterModule } from '@nestjs/platform-express'
import * as multer from 'multer'
import { extname } from 'path'

@Module({
	imports: [
		PrismaModule,
		MulterModule.register({
			storage: multer.diskStorage({
				destination: (req, file, cb) => {
					if (file.mimetype.startsWith('image/')) {
						cb(null, `${process.cwd()}/uploads/images`)
					} else {
						cb(new BadRequestException('Unsupported file type'),'')
					}
				},
				filename: (req, file, cb) => {
					const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
					cb(null, `${uniqueSuffix}${extname(file.originalname)}`)
				},
			}),
			fileFilter: (req, file, cb) => {
				const allowedImageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']

				if (allowedImageTypes.includes(file.mimetype)) {
					cb(null, true)
				} else {
					cb(new BadRequestException('Unsupported file type'), false)
				}
			},
		}),
	],
	controllers: [ProductController],
	providers: [ProductService, ProductRepository],
	exports: [ProductService, ProductRepository],
})
export class ProductModule {}
