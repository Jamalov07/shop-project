import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ActionModule, AuthModule, ClientModule, CronModule, PrismaModule, ProductModule, ProductStorehouseModule, RoleModule, StaffModule, StorehouseModule } from '@module'
import { appConfig, databaseConfig, jwtConfig } from '@config'
import { AuthGuard, CheckPermissionGuard } from '@common'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [appConfig, databaseConfig, jwtConfig],
		}),
		PrismaModule,
		StaffModule,
		AuthModule,
		ActionModule,
		ClientModule,
		RoleModule,
		StorehouseModule,
		ProductModule,
		ProductStorehouseModule,
		CronModule,
	],
	controllers: [],
	providers: [AuthGuard, CheckPermissionGuard],
})
export class AppModule {}
