import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto, IsIntOrBigInt } from '../../../common'
import { SellingOptional, SellingRequired } from '../interfaces'
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { $Enums, SellingStatusEnum } from '@prisma/client'

export class SellingRequiredDto extends PickType(DefaultRequiredFieldsDto, ['id', 'createdAt']) implements SellingRequired {
	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	clientId: string


	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	staffId: string

	@ApiProperty({ enum: SellingStatusEnum })
	@IsNotEmpty()
	@IsEnum(SellingStatusEnum)
	status: $Enums.SellingStatusEnum

	@ApiProperty({ type: BigInt })
	@IsNotEmpty()
	@IsIntOrBigInt()
	totalSum: bigint
}

export class SellingOptionalDto extends PickType(DefaultOptionalFieldsDto, ['id', 'createdAt']) implements SellingOptional {
	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	clientId?: string

	
	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	staffId?: string

	@ApiPropertyOptional({ enum: SellingStatusEnum })
	@IsOptional()
	@IsEnum(SellingStatusEnum)
	status?: $Enums.SellingStatusEnum

	@ApiPropertyOptional({ type: BigInt })
	@IsOptional()
	@IsIntOrBigInt()
	totalSum?: bigint
}
