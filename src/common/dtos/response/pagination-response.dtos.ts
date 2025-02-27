import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { PaginationRequest } from '../../interfaces'
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'
import { PAGE_NUMBER, PAGE_SIZE, PAGINATION } from '../../constants'
import { Transform } from 'class-transformer'

export class PaginationRequestDto implements PaginationRequest {
	@ApiPropertyOptional({ type: Number })
	@IsNumber()
	@IsOptional()
	pageNumber?: number = PAGE_NUMBER

	@ApiPropertyOptional({ type: Number })
	@IsNumber()
	@IsOptional()
	pageSize?: number = PAGE_SIZE

	@ApiPropertyOptional({ type: Boolean, example: false })
	@Transform(({ value }) => ![false, 'false'].includes(value))
	@IsBoolean()
	@IsOptional()
	pagination?: boolean = PAGINATION
}

export class PaginationResponseDto {
	@ApiProperty({ example: 20 })
	@IsNumber()
	@IsNotEmpty()
	pagesCount: number

	@ApiProperty({ example: 10 })
	@IsNumber()
	@IsNotEmpty()
	pageSize: number
}
