import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import {
	ActionModule,
	AuthModule,
	ClientModule,
	CronModule,
	ExcelModule,
	PaymentModule,
	PrismaModule,
	ProductModule,
	ProductStorehouseModule,
	RoleModule,
	SellingModule,
	StaffModule,
	StorehouseModule,
} from '@module'
import { appConfig, databaseConfig, jwtConfig } from '@config'
import { AuthGuard, CheckPermissionGuard } from '@common'
import { join } from 'path'

@Module({
	imports: [
		ServeStaticModule.forRoot(
			{ rootPath: join(__dirname, '..', 'uploads', 'images'), serveRoot: '/' },
			{ rootPath: join(__dirname, '..', 'uploads', 'videos'), serveRoot: '/' },
			{ rootPath: join(__dirname, '..', 'uploads', 'files'), serveRoot: '/' },
		),
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
		PaymentModule,
		SellingModule,
		CronModule,
		ExcelModule,
	],
	controllers: [],
	providers: [AuthGuard, CheckPermissionGuard],
})
export class AppModule {}
