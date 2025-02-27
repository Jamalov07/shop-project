import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto } from '../../../common'
import { RoleOptional, RoleRequired } from '../interfaces'
import { IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator'

export class RoleRequiredDto extends PickType(DefaultRequiredFieldsDto, ['id', 'createdAt']) implements RoleRequired {
	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	name: string
}

export class RoleOptionalDto extends PickType(DefaultOptionalFieldsDto, ['id', 'createdAt']) implements RoleOptional {
	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	name?: string
}
