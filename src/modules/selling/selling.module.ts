import { Module } from '@nestjs/common'
import { ExcelModule, PrismaModule } from '../shared'
import { SellingController } from './selling.controller'
import { SellingService } from './selling.service'
import { SellingRepository } from './selling.repository'
import { PaymentModule } from '../payment'
import { ProductStorehouseModule } from '../product-storehouse'

@Module({
	imports: [PrismaModule, PaymentModule, ProductStorehouseModule, ExcelModule],
	controllers: [SellingController],
	providers: [SellingService, SellingRepository],
	exports: [SellingService, SellingRepository],
})
export class SellingModule {}
