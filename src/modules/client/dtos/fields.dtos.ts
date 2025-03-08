import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto } from '../../../common'
import { ClientOptional, ClientRequired } from '../interfaces'
import { IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator'

export class ClientRequiredDto extends PickType(DefaultRequiredFieldsDto, ['id', 'createdAt', 'updatedAt', 'deletedAt']) implements ClientRequired {
	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsPhoneNumber('UZ')
	phone: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	fullname: string
}

export class ClientOptionalDto extends PickType(DefaultOptionalFieldsDto, ['id', 'createdAt', 'updatedAt', 'deletedAt']) implements ClientOptional {
	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsPhoneNumber('UZ')
	phone?: string = undefined

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	fullname?: string = ''
}
