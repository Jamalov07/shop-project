import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto, IsIntOrBigInt } from '../../../common'
import { PaymentOptional, PaymentRequired } from '../interfaces'
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class PaymentRequiredDto extends PickType(DefaultRequiredFieldsDto, ['id', 'createdAt']) implements PaymentRequired {
	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	clientId: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	staffId: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	description: string

	@ApiProperty({ type: BigInt })
	@IsNotEmpty()
	@IsIntOrBigInt()
	other: bigint = BigInt(0)

	@ApiProperty({ type: BigInt })
	@IsNotEmpty()
	@IsIntOrBigInt()
	cash: bigint = BigInt(0)

	@ApiProperty({ type: BigInt })
	@IsNotEmpty()
	@IsIntOrBigInt()
	card: bigint = BigInt(0)

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	sellingId: string
}

export class PaymentOptionalDto extends PickType(DefaultOptionalFieldsDto, ['id', 'createdAt']) implements PaymentOptional {
	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	clientId?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	staffId?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	sellingId?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	description?: string

	@ApiPropertyOptional({ type: BigInt })
	@IsOptional()
	@IsIntOrBigInt()
	other?: bigint

	@ApiPropertyOptional({ type: BigInt })
	@IsOptional()
	@IsIntOrBigInt()
	card?: bigint

	@ApiPropertyOptional({ type: BigInt })
	@IsOptional()
	@IsIntOrBigInt()
	cash?: bigint
}
