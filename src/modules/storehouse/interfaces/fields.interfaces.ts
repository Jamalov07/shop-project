import { ProductToStorehouseModel, StorehouseModel } from '@prisma/client'

export declare interface StorehouseRequired extends Required<StorehouseModel> {}

export declare interface StorehouseOptional extends Partial<StorehouseModel> {}

export declare interface StorehouseProductRequired extends Required<ProductToStorehouseModel> {}

export declare interface StorehouseProductOptional extends Partial<ProductToStorehouseModel> {}
