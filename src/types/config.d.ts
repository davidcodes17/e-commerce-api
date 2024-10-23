import type { Currency } from "./utils";

export interface PaymentLinkType {
    tx_ref?:string,
    amount:string,
    currency:Currency,
    meta?: any,
    customer:any,
    uuid?:string,
    user_id?:any
}