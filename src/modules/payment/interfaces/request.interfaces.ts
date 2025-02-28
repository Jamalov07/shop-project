import { RequestOtherFields } from '../../../common'
import { PaymentOptional, PaymentRequired } from './fields.interfaces'

export declare interface PaymentFindManyRequest extends Pick<PaymentOptional, 'clientId' | 'description'>, Pick<RequestOtherFields, 'ids'> {}

export declare interface PaymentFindOneRequest extends Pick<PaymentRequired, 'id'> {}

export declare interface PaymentGetManyRequest extends Pick<PaymentOptional, 'card' | 'cash' | 'clientId' | 'description' | 'other'>, Pick<RequestOtherFields, 'ids'> {}

export declare interface PaymentGetOneRequest extends Pick<PaymentOptional, 'id' | 'card' | 'cash' | 'clientId' | 'description' | 'other'> {}

export declare interface PaymentCreateOneRequest extends Pick<PaymentRequired, 'clientId'>, Pick<PaymentOptional, 'card' | 'cash' | 'description' | 'other'> {}

export declare interface PaymentUpdateOneRequest extends Pick<PaymentOptional, 'description'> {}
