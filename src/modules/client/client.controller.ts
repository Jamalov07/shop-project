import { Body, Controller, Delete, Get, Patch, Post, Query, Res, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ClientService } from './client.service'
import { AuthOptions, CheckPermissionGuard } from '@common'
import {
	ClientFindManyRequestDto,
	ClientCreateOneRequestDto,
	ClientUpdateOneRequestDto,
	ClientFindOneRequestDto,
	ClientFindManyResponseDto,
	ClientFindOneResponseDto,
	ClientModifyResponseDto,
	ClientDeleteOneRequestDto,
} from './dtos'
import { ExcelService } from '../shared'
import { Response } from 'express'

@ApiTags('Client')
// @UseGuards(CheckPermissionGuard)
@Controller('client')
export class ClientController {
	private readonly clientService: ClientService
	private readonly excelService: ExcelService

	constructor(clientService: ClientService, excelService: ExcelService) {
		this.clientService = clientService
		this.excelService = excelService
	}

	@Get('many')
	@ApiOkResponse({ type: ClientFindManyResponseDto })
	@ApiOperation({ summary: 'get all clients' })
	@AuthOptions(false, false)
	async findAll(@Query() query: ClientFindManyRequestDto): Promise<ClientFindManyResponseDto> {
		return this.clientService.findMany(query)
	}

	@Get('excel')
	@ApiOkResponse({ type: File })
	@ApiOperation({ summary: 'get all clients in excel' })
	async downloanExcel(@Res() response: Response) {
		return this.excelService.exportClientsToExcel(response)
	}

	@Get('one')
	@ApiOperation({ summary: 'find one client' })
	@ApiOkResponse({ type: ClientFindOneResponseDto })
	async getOne(@Query() query: ClientFindOneRequestDto): Promise<ClientFindOneResponseDto> {
		return this.clientService.findOne(query)
	}

	@Post('one')
	@ApiOperation({ summary: 'add one client' })
	@ApiOkResponse({ type: ClientModifyResponseDto })
	async createOne(@Body() body: ClientCreateOneRequestDto): Promise<ClientModifyResponseDto> {
		return this.clientService.createOne(body)
	}

	@Patch('one')
	@ApiOperation({ summary: 'update one client' })
	@ApiOkResponse({ type: ClientModifyResponseDto })
	async update(@Query() query: ClientFindOneRequestDto, @Body() body: ClientUpdateOneRequestDto): Promise<ClientModifyResponseDto> {
		return this.clientService.updateOne(query, body)
	}

	@Delete('one')
	@ApiOperation({ summary: 'delete one staff' })
	@ApiOkResponse({ type: ClientModifyResponseDto })
	async delete(@Query() query: ClientDeleteOneRequestDto): Promise<ClientModifyResponseDto> {
		return this.clientService.deleteOne(query)
	}
}
