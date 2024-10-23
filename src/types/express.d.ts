import { Request } from "express";

export interface User{
    username?:string,
    firstName?:string,
    lastName?:string,
    phone?:string,
    email?:string,
    _2FA?:string,
    locale?:string,
    avatarId?:string,
    avatar?:string,
    lastLogin?:string,
    createdAt?:string,
    account_balance?:string,
    verified?:string,
    isSeller?:string,
    uuid?:string,
    [key: string]:string
}




export interface IRequest extends Request{
    user?: User,
    seller?:any
}