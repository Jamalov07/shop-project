import { Module } from '@nestjs/common'
import { PrismaModule } from '../shared'
import { PaymentController } from './payment.controller'
import { PaymentService } from './payment.service'
import { PaymentRepository } from './payment.repository'

@Module({
	imports: [PrismaModule],
	controllers: [PaymentController],
	providers: [PaymentService, PaymentRepository],
	exports: [PaymentService, PaymentRepository],
})
export class PaymentModule {}
