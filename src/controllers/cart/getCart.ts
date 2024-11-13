import { Request, Response } from "express";
import { fetchCart } from "../../utils/carts";
import mainConfig from "../../config/main";
import errorHandler from "../../utils/errorHandler";

export default async (req: Request, res: Response) => {
  try {
    const carts = await fetchCart(req, "all");
    console.log(carts)
    return res.status(mainConfig.status.ok).json({
      msg: "All Carts Retrived",
      data: carts,
    });
  } catch (error) {
    console.log(error)
    return errorHandler(res, error);
  }
};
