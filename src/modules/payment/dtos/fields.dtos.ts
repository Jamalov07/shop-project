import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto } from '../../../common'
import { PaymentOptional, PaymentRequired } from '../interfaces'
import { IsNotEmpty, IsNumberString, IsOptional, IsString, IsUUID } from 'class-validator'

export class PaymentRequiredDto extends PickType(DefaultRequiredFieldsDto, ['id', 'createdAt']) implements PaymentRequired {
	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsNumberString()
	card: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsNumberString()
	cash: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	clientId: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	description: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsNumberString()
	other: string
}

export class PaymentOptionalDto extends PickType(DefaultOptionalFieldsDto, ['id', 'createdAt']) implements PaymentOptional {
	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsNumberString()
	card?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsNumberString()
	cash?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	clientId?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	description?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsNumberString()
	other?: string
}
