import { Module } from '@nestjs/common'
import { PrismaModule } from '../shared'
import { StorehouseController } from './storehouse.controller'
import { StorehouseService } from './storehouse.service'
import { StorehouseRepository } from './storehouse.repository'

@Module({
	imports: [PrismaModule],
	controllers: [StorehouseController],
	providers: [StorehouseService, StorehouseRepository],
	exports: [StorehouseService, StorehouseRepository],
})
export class StorehouseModule {}
