import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto } from '@common'
import { ProductOptional, ProductRequired } from '../interfaces'
import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator'

export class ProductRequiredDto extends PickType(DefaultRequiredFieldsDto, ['id', 'updatedAt', 'createdAt', 'deletedAt']) implements ProductRequired {
	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	name: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsNumberString()
	cost: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsNumberString()
	price: string

	@ApiProperty({ type: Number })
	@IsNotEmpty()
	@IsNumber()
	quantity: number

	@ApiProperty({ type: Number })
	@IsNotEmpty()
	@IsNumber()
	warningThreshold: number
}

export class ProductOptionalDto extends PickType(DefaultOptionalFieldsDto, ['id', 'updatedAt', 'createdAt', 'deletedAt']) implements ProductOptional {
	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	name?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsNumberString()
	cost?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsNumberString()
	price?: string

	@ApiPropertyOptional({ type: Number })
	@IsOptional()
	@IsNumber()
	quantity?: number

	@ApiPropertyOptional({ type: Number })
	@IsOptional()
	@IsNumber()
	warningThreshold?: number
}
