import { PickType, IntersectionType } from '@nestjs/swagger'
import { RoleCreateOneRequest, RoleDeleteOneRequest, RoleFindManyRequest, RoleFindOneRequest, RoleUpdateOneRequest } from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '@common'
import { RoleOptionalDto, RoleRequiredDto } from './fields.dtos'

export class RoleFindManyRequestDto extends IntersectionType(PickType(RoleOptionalDto, ['name']), PaginationRequestDto) implements RoleFindManyRequest {}

export class RoleFindOneRequestDto extends IntersectionType(PickType(RoleRequiredDto, ['id'])) implements RoleFindOneRequest {}

export class RoleCreateOneRequestDto
	extends IntersectionType(PickType(RoleRequiredDto, ['name']), PickType(RequestOtherFieldsDto, ['actionsToCreate']))
	implements RoleCreateOneRequest {}

export class RoleUpdateOneRequestDto
	extends IntersectionType(PickType(RoleOptionalDto, ['name']), PickType(RequestOtherFieldsDto, ['actionsToCreate', 'actionsToRemove']))
	implements RoleUpdateOneRequest {}

export class RoleDeleteOneRequestDto extends IntersectionType(PickType(RoleRequiredDto, ['id'])) implements RoleDeleteOneRequest {}
