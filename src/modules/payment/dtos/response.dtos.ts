import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { Calc, PaymentCalc, PaymentFindManyData, PaymentFindManyResponse, PaymentFindOneData, PaymentFindOneResponse, PaymentModifyResposne } from '../interfaces'
import { GlobalModifyResponseDto, GlobalResponseDto, PaginationResponseDto } from '@common'
import { PaymentRequiredDto } from './fields.dtos'
import { ClientFindOneData, ClientFindOneDataDto } from '../../client'
import { SellingFindOneData, SellingFindOneDataDto } from '../../selling'
import { StaffFindOneData, StaffFindOneDataDto } from '../../staff'

export class PaymentFindOneDataDto extends PickType(PaymentRequiredDto, ['id', 'createdAt', 'description', 'other']) implements PaymentFindOneData {
	@ApiProperty({ type: ClientFindOneDataDto })
	client?: ClientFindOneData

	@ApiProperty({ type: SellingFindOneDataDto })
	selling?: SellingFindOneData

	@ApiProperty({ type: StaffFindOneDataDto })
	staff?: StaffFindOneData
}

export class CalcDto implements Calc {
	@ApiProperty({ type: BigInt })
	other: bigint
}

export class PaymentCalcDto implements PaymentCalc {
	@ApiProperty({ type: CalcDto })
	inPage: Calc

	@ApiProperty({ type: CalcDto })
	inTotal: Calc
}

export class PaymentFindManyDataDto extends PaginationResponseDto implements PaymentFindManyData {
	@ApiProperty({ type: PaymentFindOneDataDto, isArray: true })
	data: PaymentFindOneData[]

	@ApiProperty({ type: PaymentCalcDto })
	calc: PaymentCalc
}

export class PaymentFindManyResponseDto extends GlobalResponseDto implements PaymentFindManyResponse {
	@ApiProperty({ type: PaymentFindManyDataDto })
	data: PaymentFindManyData | { data: PaymentFindOneData[] }
}

export class PaymentFindOneResponseDto extends GlobalResponseDto implements PaymentFindOneResponse {
	@ApiProperty({ type: PaymentFindOneDataDto })
	data: PaymentFindOneData
}

export class PaymentModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) implements PaymentModifyResposne {}
