import { Response } from "express";
import mainConfig from "../config/main";
import logOutput from "./logOutput";

export default (res:Response, err:any)=>{
    logOutput(typeof err == "string"? err :JSON.stringify(err))
    return res.status(mainConfig.status.serverError).json({
        msg:"Internal server error"
    })
}