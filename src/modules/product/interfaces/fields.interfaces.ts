import { ProductModel } from '@prisma/client'

export declare interface ProductRequired extends Required<Omit<ProductModel, 'image'>> {
	image?: any
}

export declare interface ProductOptional extends Partial<ProductModel> {}
