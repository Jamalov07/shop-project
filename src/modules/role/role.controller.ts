import { Body, Controller, Delete, Get, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { RoleService } from './role.service'
import { AuthOptions, CheckPermissionGuard } from '@common'
import {
	RoleFindManyRequestDto,
	RoleCreateOneRequestDto,
	RoleUpdateOneRequestDto,
	RoleFindOneRequestDto,
	RoleFindManyResponseDto,
	RoleFindOneResponseDto,
	RoleModifyResponseDto,
} from './dtos'

@ApiTags('Role')
// @UseGuards(CheckPermissionGuard)
@Controller('role')
export class RoleController {
	private readonly roleService: RoleService

	constructor(roleService: RoleService) {
		this.roleService = roleService
	}

	@Get('many')
	@ApiOkResponse({ type: RoleFindManyResponseDto })
	@ApiOperation({ summary: 'get all roles' })
	@AuthOptions(false, false)
	async findAll(@Query() query: RoleFindManyRequestDto): Promise<RoleFindManyResponseDto> {
		return this.roleService.findMany(query)
	}

	@Get('one')
	@ApiOperation({ summary: 'find one role' })
	@ApiOkResponse({ type: RoleFindOneResponseDto })
	async getOne(@Query() query: RoleFindOneRequestDto): Promise<RoleFindOneResponseDto> {
		return this.roleService.findOne(query)
	}

	@Post('one')
	@ApiOperation({ summary: 'add one role' })
	@ApiOkResponse({ type: RoleModifyResponseDto })
	async create(@Body() body: RoleCreateOneRequestDto): Promise<RoleModifyResponseDto> {
		return this.roleService.createOne(body)
	}

	@Patch('one')
	@ApiOperation({ summary: 'update one role' })
	@ApiOkResponse({ type: RoleModifyResponseDto })
	async updateOne(@Query() query: RoleFindOneRequestDto, @Body() body: RoleUpdateOneRequestDto): Promise<RoleModifyResponseDto> {
		return this.roleService.updateOne(query, body)
	}

	@Delete('one')
	@ApiOperation({ summary: 'update one role' })
	@ApiOkResponse({ type: RoleModifyResponseDto })
	async deleteOne(@Query() query: RoleFindOneRequestDto): Promise<RoleModifyResponseDto> {
		return this.roleService.deleteOne(query)
	}
}
