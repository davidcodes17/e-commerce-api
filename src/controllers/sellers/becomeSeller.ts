import { Request, Response } from "express";
import Seller from "../../models/Seller";
import mainConfig from "../../config/main";
import User from "../../models/User";
import errorHandler from "../../utils/errorHandler";
import { nanoid } from "nanoid";

export default async (req: Request | any, res: Response) => {
  const { shop_category, shop_name, phone, country, address } = req.body;
  try {
    const seller_exists = await Seller.findOne({
      where: {
        user_id: req.user.uuid,
      },
    });

    const shop_name_exists = await Seller.findOne({
      where: {
        shop_name,
      },
    });

    if (shop_name_exists) {
      return res.status(mainConfig.status.conflict).json({
        msg: "Shop Name Already Taken",
      });
    }

    if (seller_exists) {
      return res.status(mainConfig.status.conflict).json({
        msg: "Already a seller",
      });
    }

    const seller = await Seller.create({
      user_id: req.user.uuid,
      uuid:nanoid(),
      shop_category,
      shop_name,
      phone,
      region:country,
      delivery_zone:address,
    });

    await seller.save();
    await User.update(
      {
        isSeller: true,
      },
      {
        where: {
          uuid: req.user.uuid,
        },
      }
    );

    return res.status(mainConfig.status.created).json({
      msg: "Seller Profile created successfully",
      data: {
        shop_name: seller.get().shop_name,
        shop_icon: seller.get().shop_icon,
        phone: seller.get().phone,
        region: seller.get().region,
        delivery_zone: seller.get().delivery_zone,
      },
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};
