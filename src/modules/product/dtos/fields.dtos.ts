import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto, IsIntOrBigInt } from '@common'
import { ProductOptional, ProductRequired } from '../interfaces'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { Transform, Type } from 'class-transformer'

export class ProductRequiredDto extends PickType(DefaultRequiredFieldsDto, ['id', 'updatedAt', 'createdAt', 'deletedAt']) implements ProductRequired {
	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	name: string

	@ApiProperty({ type: BigInt })
	@IsNotEmpty()
	@Transform(({ value }) => (value ? BigInt(value) : undefined))
	@IsIntOrBigInt()
	cost: bigint = BigInt(0)

	@ApiProperty({ type: BigInt })
	@IsNotEmpty()
	@Transform(({ value }) => (value ? BigInt(value) : undefined))
	@IsIntOrBigInt()
	price: bigint = BigInt(0)

	@ApiProperty({ type: 'string', format: 'binary', description: 'image file' })
	image?: any

	@ApiProperty({ type: Number })
	@IsNotEmpty()
	@Transform(({ value }) => Number(value))
	@IsNumber()
	quantity: number

	@ApiProperty({ type: Number })
	@IsNotEmpty()
	@Transform(({ value }) => Number(value))
	@IsNumber()
	warningThreshold: number
}

export class ProductOptionalDto extends PickType(DefaultOptionalFieldsDto, ['id', 'updatedAt', 'createdAt', 'deletedAt']) implements ProductOptional {
	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	name?: string

	@ApiPropertyOptional({ type: BigInt })
	@IsOptional()
	@Transform(({ value }) => (value ? BigInt(value) : undefined))
	@IsIntOrBigInt()
	cost?: bigint

	@ApiPropertyOptional({ type: BigInt })
	@IsOptional()
	@Transform(({ value }) => (value ? BigInt(value) : undefined))
	@IsIntOrBigInt()
	price?: bigint

	@ApiProperty({ type: 'string', format: 'binary', description: 'image file' })
	image?: any

	@ApiPropertyOptional({ type: Number })
	@IsOptional()
	@Transform(({ value }) => Number(value))
	@IsNumber()
	quantity?: number

	@ApiPropertyOptional({ type: Number })
	@IsOptional()
	@Transform(({ value }) => Number(value))
	@IsNumber()
	warningThreshold?: number
}
