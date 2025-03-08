import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { Calc, PaymentCalc, PaymentFindManyData, PaymentFindOneData, PaymentFindOneResponse, PaymentModifyResposne } from '../interfaces'
import { GlobalModifyResponseDto, GlobalResponseDto, PaginationResponseDto } from '@common'
import { PaymentRequiredDto } from './fields.dtos'

export class PaymentFindOneDataDto extends PickType(PaymentRequiredDto, ['id', 'createdAt', 'card', 'cash', 'clientId', 'description', 'other']) implements PaymentFindOneData {}

export class CalcDto implements Calc {
	@ApiProperty({ type: BigInt })
	card: bigint

	@ApiProperty({ type: BigInt })
	cash: bigint

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

export class PaymentFindManyResponseDto extends GlobalResponseDto implements PaymentFindManyResponseDto {
	@ApiProperty({ type: PaymentFindManyDataDto })
	data: PaymentFindManyData | { data: PaymentFindOneData[] }
}

export class PaymentFindOneResponseDto extends GlobalResponseDto implements PaymentFindOneResponse {
	@ApiProperty({ type: PaymentFindOneDataDto })
	data: PaymentFindOneData
}

export class PaymentModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) implements PaymentModifyResposne {}
