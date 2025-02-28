import { PaymentModel } from '@prisma/client'

export declare interface PaymentRequired extends Required<PaymentModel> {}

export declare interface PaymentOptional extends Partial<PaymentModel> {}
