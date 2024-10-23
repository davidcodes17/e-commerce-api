import { Request, Response } from "express";
import mainConfig from "../config/main";

export default (req: Request, res: Response) => {
  res
    .status(mainConfig.status.notFound)
    .json({ msg: "Oops!, YOU HIT THE WRONG ROUTE - CONTACT THE DEVELOPER IF THIS IS A MISTAKE 🤒" });
};
