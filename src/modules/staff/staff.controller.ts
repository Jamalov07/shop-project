import { Body, Controller, Delete, Get, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { StaffService } from './staff.service'
import { AuthOptions, CheckPermissionGuard } from '@common'
import {
	StaffFindManyRequestDto,
	StaffCreateOneRequestDto,
	StaffUpdateOneRequestDto,
	StaffDeleteOneRequestDto,
	StaffFindOneRequestDto,
	StaffFindManyResponseDto,
	StaffFindOneResponseDto,
	StaffModifyResponseDto,
	StaffCreateManyRequestDto,
	StaffUpdateManyRequestDto,
	StaffDeleteManyRequestDto,
} from './dtos'

@ApiTags('Staff')
// @UseGuards(CheckPermissionGuard)
@Controller('staff')
export class StaffController {
	private readonly staffService: StaffService

	constructor(staffService: StaffService) {
		this.staffService = staffService
	}

	@Get('many')
	@ApiOkResponse({ type: StaffFindManyResponseDto })
	@ApiOperation({ summary: 'get all staffs' })
	@AuthOptions(false, false)
	async findMany(@Query() query: StaffFindManyRequestDto): Promise<StaffFindManyResponseDto> {
		return this.staffService.findMany(query)
	}

	@Post('many')
	@ApiOperation({ summary: 'add many staffs' })
	@ApiOkResponse({ type: StaffModifyResponseDto })
	async createMany(@Body() body: StaffCreateManyRequestDto): Promise<StaffModifyResponseDto> {
		return await this.staffService.createMany(body)
	}

	@Patch('many')
	@ApiOperation({ summary: 'update many staffs' })
	@ApiOkResponse({ type: StaffModifyResponseDto })
	async updateMany(@Body() body: StaffUpdateManyRequestDto): Promise<StaffModifyResponseDto> {
		return this.staffService.updateMany(body)
	}

	@Delete('many')
	@ApiOperation({ summary: 'delete many staffs' })
	@ApiOkResponse({ type: StaffModifyResponseDto })
	async deleteMany(@Query() query: StaffDeleteManyRequestDto): Promise<StaffModifyResponseDto> {
		return await this.staffService.deleteMany(query)
	}

	//================================================||

	@Get('one')
	@ApiOperation({ summary: 'find one staff' })
	@ApiOkResponse({ type: StaffFindOneResponseDto })
	async findOne(@Query() query: StaffFindOneRequestDto): Promise<StaffFindOneResponseDto> {
		return this.staffService.findOne(query)
	}

	@Post('one')
	@ApiOperation({ summary: 'add one staff' })
	@ApiOkResponse({ type: StaffModifyResponseDto })
	async createOne(@Body() body: StaffCreateOneRequestDto): Promise<StaffModifyResponseDto> {
		return this.staffService.createOne(body)
	}

	@Patch('one')
	@ApiOperation({ summary: 'update one staff' })
	@ApiOkResponse({ type: StaffModifyResponseDto })
	async updateOne(@Query() query: StaffFindOneRequestDto, @Body() body: StaffUpdateOneRequestDto): Promise<StaffModifyResponseDto> {
		return this.staffService.updateOne(query, body)
	}

	@Delete('one')
	@ApiOperation({ summary: 'delete one staff' })
	@ApiOkResponse({ type: StaffModifyResponseDto })
	async deleteOne(@Query() query: StaffDeleteOneRequestDto): Promise<StaffModifyResponseDto> {
		return this.staffService.deleteOne(query)
	}
}
