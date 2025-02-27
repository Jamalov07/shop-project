import { Body, Controller, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AuthModifyResponseDto, StaffSignInRequestDto, StaffSignInResponseDto } from './dtos'
import { CRequest, AuthOptions, RefreshTokenInterceptor } from '@common'

@Controller('auth')
export class AuthController {
	private readonly authService: AuthService
	constructor(authService: AuthService) {
		this.authService = authService
	}

	@Post('sign-in')
	@ApiOperation({ summary: 'sign in staff' })
	@ApiOkResponse({ type: StaffSignInResponseDto })
	async signIn(@Req() request: CRequest, @Body() body: StaffSignInRequestDto): Promise<StaffSignInResponseDto> {
		return this.authService.signIn(body)
	}

	@Post('sign-out')
	@AuthOptions(true, true)
	@ApiOperation({ summary: 'sign out staff' })
	@ApiOkResponse({ type: AuthModifyResponseDto })
	async signOut(@Req() request: CRequest): Promise<AuthModifyResponseDto> {
		return this.authService.signOut({ staff: request.staff })
	}

	@Post('refresh-token')
	@ApiOperation({ summary: 'refresh token' })
	@ApiOkResponse({ type: StaffSignInResponseDto })
	@UseInterceptors(RefreshTokenInterceptor)
	async getValidTokensWithRefresh(@Req() request: CRequest) {
		return this.authService.getValidTokens({ staff: request.staff })
	}
}
