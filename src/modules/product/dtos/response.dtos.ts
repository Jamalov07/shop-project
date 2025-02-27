import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { ProductFindManyData, ProductFindOneData, ProductFindOneResponse, ProductModifyResposne } from '../interfaces'
import { GlobalModifyResponseDto, GlobalResponseDto, PaginationResponseDto } from '@common'
import { ProductRequiredDto } from './fields.dtos'

export class ProductFindOneDataDto
	extends PickType(ProductRequiredDto, ['id', 'name', 'cost', 'price', 'quantity', 'warningThreshold', 'createdAt'])
	implements ProductFindOneData {}

export class ProductFindManyDataDto extends PaginationResponseDto implements ProductFindManyData {
	@ApiProperty({ type: ProductFindOneDataDto, isArray: true })
	data: ProductFindOneData[]
}

export class ProductFindManyResponseDto extends GlobalResponseDto implements ProductFindManyResponseDto {
	@ApiProperty({ type: ProductFindManyDataDto })
	data: ProductFindManyData | ProductFindOneData[]
}

export class ProductFindOneResponseDto extends GlobalResponseDto implements ProductFindOneResponse {
	@ApiProperty({ type: ProductFindOneDataDto })
	data: ProductFindOneData
}

export class ProductModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) implements ProductModifyResposne {}
