import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto } from '../../../common'
import { ProductStorehouseOptional, ProductStorehouseRequired } from '../interfaces'

export class ProductStorehouseRequiredDto extends PickType(DefaultRequiredFieldsDto, ['id', 'createdAt']) implements ProductStorehouseRequired {
	@ApiProperty({ type: String, example: '00097072-f510-4ded-a18f-976d7fa2e024' })
	@IsNotEmpty()
	@IsString()
	@IsUUID('4')
	productId: string

	@ApiProperty({ type: Number })
	@IsNotEmpty()
	@IsNumber()
	quantity: number

	@ApiProperty({ type: String, example: '00097072-f510-4ded-a18f-976d7fa2e024' })
	@IsNotEmpty()
	@IsString()
	@IsUUID('4')
	storehouseId: string
}

export class ProductStorehouseOptionalDto extends PickType(DefaultOptionalFieldsDto, ['id', 'createdAt']) implements ProductStorehouseOptional {
	@ApiPropertyOptional({ type: String, example: '00097072-f510-4ded-a18f-976d7fa2e024' })
	@IsOptional()
	@IsString()
	@IsUUID('4')
	productId?: string

	@ApiPropertyOptional({ type: Number })
	@IsOptional()
	@IsNumber()
	quantity?: number

	@ApiPropertyOptional({ type: String, example: '00097072-f510-4ded-a18f-976d7fa2e024' })
	@IsOptional()
	@IsString()
	@IsUUID('4')
	storehouseId?: string
}
