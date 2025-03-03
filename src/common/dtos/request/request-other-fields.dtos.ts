import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { RequestOtherFields } from '../../interfaces'
import { ArrayNotEmpty, ArrayUnique, IsArray, IsBoolean, IsEnum, IsOptional, IsUUID } from 'class-validator'
import { Transform } from 'class-transformer'
import { DeleteMethodEnum } from '../../enums'

export class RequestOtherFieldsDto implements RequestOtherFields {
	@ApiProperty({ type: String, isArray: true })
	@IsArray()
	@IsUUID('4', { each: true })
	@ArrayNotEmpty({ message: 'UUIDs array should not be empty' })
	@ArrayUnique({ message: 'UUIDs should be unique' })
	ids: string[] = []

	@ApiPropertyOptional({ type: Boolean })
	@Transform(({ value }) => ([false, 'false'].includes(value) ? false : [true, 'true'].includes(value) ? true : undefined))
	@IsBoolean()
	@IsOptional()
	isDeleted?: boolean

	@ApiPropertyOptional({ enum: DeleteMethodEnum })
	@IsEnum(DeleteMethodEnum)
	@IsOptional()
	method?: DeleteMethodEnum = DeleteMethodEnum.soft

	@ApiProperty({ type: String, isArray: true })
	@IsArray()
	@IsUUID('4', { each: true })
	@ArrayNotEmpty({ message: 'UUIDs array should not be empty' })
	@ArrayUnique({ message: 'UUIDs should be unique' })
	rolesToConnect?: string[] = []

	@ApiProperty({ type: String, isArray: true })
	@IsArray()
	@IsUUID('4', { each: true })
	@ArrayNotEmpty({ message: 'UUIDs array should not be empty' })
	@ArrayUnique({ message: 'UUIDs should be unique' })
	rolesToDisconnect?: string[] = []

	@ApiProperty({ type: String, isArray: true })
	@IsArray()
	@IsUUID('4', { each: true })
	@ArrayNotEmpty({ message: 'UUIDs array should not be empty' })
	@ArrayUnique({ message: 'UUIDs should be unique' })
	actionsToConnect?: string[] = []

	@ApiProperty({ type: String, isArray: true })
	@IsArray()
	@IsUUID('4', { each: true })
	@ArrayNotEmpty({ message: 'UUIDs array should not be empty' })
	@ArrayUnique({ message: 'UUIDs should be unique' })
	actionsToDisconnect?: string[] = []
}
