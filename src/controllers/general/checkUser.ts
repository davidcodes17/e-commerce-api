import { Request, Response } from "express";
import errorHandler from "../../utils/errorHandler";
import User from "../../models/User";
import Seller from "../../models/Seller";
import mainConfig from "../../config/main";

export default async (req: Request, res: Response) => {
  try {
    const { email, shop_name, username } = req.query;
    const data: any = {
        email_exists:false,
        shop_exists:false,
        username_exists:false
    };

    if (username) {
      const getUsername = await User.findOne({
        where: {
          username,
        },
      });
      getUsername && (data.username_exists = true);
    }
    if (email) {
      const getEmail = await User.findOne({
        where: {
          email,
        },
      });
      getEmail && (data.email_exists = true);
    }
    if (shop_name) {
      const getShop = await Seller.findOne({
        where: {
          shop_name,
        },
      });
      getShop && (data.shop_exists = true);
    }

    return res.status(mainConfig.status.ok).json({
        msg:"Success",
        data
    })
  } catch (error) {
    return errorHandler(res, error);
  }
};
