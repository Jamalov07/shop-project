import { IsBoolean, IsEmail, IsEnum, IsJWT, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto } from '@common'
import { StaffOptional, StaffRequired } from '../interfaces'
import { $Enums } from '@prisma/client'

export class StaffRequiredDto extends DefaultRequiredFieldsDto implements StaffRequired {
	@ApiProperty({ type: String, example: '998949174127' })
	@IsNotEmpty()
	@IsString()
	@IsPhoneNumber('UZ')
	phone: string

	@ApiProperty({ type: String, example: '00d7fa2e024' })
	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	password: string

	@ApiProperty({ type: String, example: 'jamalov n' })
	@IsNotEmpty()
	@IsString()
	fullname: string

	@ApiProperty({ type: String, example: 'token' })
	@IsNotEmpty()
	@IsJWT()
	token: string
}

export class StaffOptionalDto extends DefaultOptionalFieldsDto implements StaffOptional {
	@ApiPropertyOptional({ type: String, example: '998949174127' })
	@IsOptional()
	@IsString()
	@IsPhoneNumber('UZ')
	phone?: string

	@ApiPropertyOptional({ type: String, example: '123456777' })
	@IsOptional()
	@MinLength(8)
	@IsString()
	password?: string

	@ApiPropertyOptional({ type: String, example: 'jamalov n' })
	@IsOptional()
	@IsString()
	fullname?: string

	@ApiPropertyOptional({ type: String, example: 'token' })
	@IsOptional()
	@IsJWT()
	token?: string
}
