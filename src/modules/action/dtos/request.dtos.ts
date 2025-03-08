import { IntersectionType, PickType } from '@nestjs/swagger'
import { ActionFindManyRequest, ActionFindOneRequest, ActionGetManyRequest, ActionGetOneRequest, ActionUpdateOneRequest } from '../interfaces'
import { ActionOptionalDto, ActionRequiredDto } from './fields.dtos'
import { PaginationRequestDto, RequestOtherFieldsDto } from '@common'

export class ActionFindManyRequestDto
	extends IntersectionType(PickType(ActionOptionalDto, ['name', 'method', 'url', 'description']), PaginationRequestDto)
	implements ActionFindManyRequest {}

export class ActionFindOneRequestDto extends PickType(ActionRequiredDto, ['id']) implements ActionFindOneRequest {}

export class ActionGetManyRequestDto
	extends IntersectionType(PickType(ActionOptionalDto, ['name', 'method', 'url', 'description']), PaginationRequestDto)
	implements ActionGetManyRequest {}

export class ActionGetOneRequestDto extends PickType(ActionRequiredDto, ['id']) implements ActionGetOneRequest {}

export class ActionUpdateOneRequestDto extends PickType(ActionOptionalDto, ['description']) implements ActionUpdateOneRequest {}
