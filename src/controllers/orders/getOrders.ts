import { Request, Response } from "express";
import errorHandler from "../../utils/errorHandler";
import Orders from "../../models/Order";

export default async (req: Request, res: Response) => {
  try {
    const orders = await Orders.findAll();
    return res.status(200).json({
      msg: "Orders Retrieved",
      data: orders,
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};
