import { PickType, IntersectionType } from '@nestjs/swagger'
import { StorehouseCreateOneRequest, StorehouseDeleteOneRequest, StorehouseFindManyRequest, StorehouseFindOneRequest, StorehouseUpdateOneRequest } from '../interfaces'
import { PaginationRequestDto } from '@common'
import { StorehouseOptionalDto, StorehouseRequiredDto } from './fields.dtos'

export class StorehouseFindManyRequestDto
	extends IntersectionType(PickType(StorehouseOptionalDto, ['name', 'hexColor']), PaginationRequestDto)
	implements StorehouseFindManyRequest {}

export class StorehouseFindOneRequestDto extends IntersectionType(PickType(StorehouseRequiredDto, ['id'])) implements StorehouseFindOneRequest {}

export class StorehouseCreateOneRequestDto extends IntersectionType(PickType(StorehouseRequiredDto, ['name', 'hexColor'])) implements StorehouseCreateOneRequest {}

export class StorehouseUpdateOneRequestDto extends IntersectionType(PickType(StorehouseOptionalDto, ['name', 'hexColor', 'position'])) implements StorehouseUpdateOneRequest {}

export class StorehouseDeleteOneRequestDto extends IntersectionType(PickType(StorehouseRequiredDto, ['id'])) implements StorehouseDeleteOneRequest {}
