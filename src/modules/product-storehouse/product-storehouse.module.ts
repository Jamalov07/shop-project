import { Module } from '@nestjs/common'
import { PrismaModule } from '../shared'
import { ProductStorehouseController } from './product-storehouse.controller'
import { ProductStorehouseService } from './product-storehouse.service'
import { ProductStorehouseRepository } from './product-storehouse.repository'

@Module({
	imports: [PrismaModule],
	controllers: [ProductStorehouseController],
	providers: [ProductStorehouseService, ProductStorehouseRepository],
	exports: [ProductStorehouseService, ProductStorehouseRepository],
})
export class ProductStorehouseModule {}
