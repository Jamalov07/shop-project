import { PickType, IntersectionType } from '@nestjs/swagger'
import { ClientCreateOneRequest, ClientFindManyRequest, ClientFindOneRequest, ClientUpdateOneRequest } from '../interfaces'
import { PaginationRequestDto } from '@common'
import { ClientOptionalDto, ClientRequiredDto } from './fields.dtos'

export class ClientFindManyRequestDto extends IntersectionType(PickType(ClientOptionalDto, ['fullname', 'phone']), PaginationRequestDto) implements ClientFindManyRequest {}

export class ClientFindOneRequestDto extends IntersectionType(PickType(ClientRequiredDto, ['id'])) implements ClientFindOneRequest {}

export class ClientCreateOneRequestDto extends IntersectionType(PickType(ClientRequiredDto, ['phone', 'fullname'])) implements ClientCreateOneRequest {}

export class ClientUpdateOneRequestDto extends PickType(ClientOptionalDto, ['fullname', 'phone']) implements ClientUpdateOneRequest {}
