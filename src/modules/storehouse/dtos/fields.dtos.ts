import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto } from '../../../common'
import { StorehouseOptional, StorehouseProductOptional, StorehouseProductRequired, StorehouseRequired } from '../interfaces'
import { IsHexColor, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'

export class StorehouseRequiredDto extends PickType(DefaultRequiredFieldsDto, ['id', 'updatedAt', 'createdAt']) implements StorehouseRequired {
	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	name: string

	@ApiProperty({ type: String, example: 'ffffff' })
	@IsNotEmpty()
	@IsHexColor()
	hexColor: string

	@ApiProperty({ type: Number })
	@IsNotEmpty()
	@IsNumber()
	position: number
}

export class StorehouseOptionalDto extends PickType(DefaultOptionalFieldsDto, ['id', 'updatedAt', 'createdAt']) implements StorehouseOptional {
	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	name?: string

	@ApiPropertyOptional({ type: String, example: 'ffffff' })
	@IsOptional()
	@IsHexColor()
	hexColor?: string

	@ApiPropertyOptional({ type: Number })
	@IsOptional()
	@IsNumber()
	position?: number
}

//==================
export class StorehouseProductRequiredDto extends PickType(DefaultRequiredFieldsDto, ['id', 'createdAt']) implements StorehouseProductRequired {
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

export class StorehouseProductOptionalDto extends PickType(DefaultOptionalFieldsDto, ['id', 'createdAt']) implements StorehouseProductOptional {
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
