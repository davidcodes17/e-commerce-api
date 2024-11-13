import { Response } from "express";
import errorHandler from "../../utils/errorHandler";
import Product from "../../models/Product";
import Seller from "../../models/Seller";
import Cart from "../../models/Cart";
import mainConfig from "../../config/main";
import { IRequest } from "../../types/express";

export default async (req: IRequest | any, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Product.destroy({
      where: {
        uuid: id,
      },
    });

    return res.status(mainConfig.status.ok).json({
      msg: "Product Deleted",
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};
