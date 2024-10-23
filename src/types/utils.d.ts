// UTILS > SEND EMAIL
export interface SendEmailTypes {
  to: string;
  subject: string;
  data: any;
  path: string;
}

export type Currency = "NGN" | "USD"

export interface flutterWaveTransferTypes {
  account_bank: string;
  account_number: string;
  amount: number;
  currency: Currency;
  narration: string;
  reference?: string;
}


export interface sendNotificationType{
  type: string,
  title:string,
  body:string,
  ref?:any,
  to:string
}