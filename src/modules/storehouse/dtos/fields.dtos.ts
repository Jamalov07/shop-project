import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto } from '../../../common'
import { StorehouseOptional, StorehouseRequired } from '../interfaces'
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
