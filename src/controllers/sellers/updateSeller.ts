import { Request, Response } from "express";
import Seller from "../../models/Seller";
import mainConfig from "../../config/main";
import errorHandler from "../../utils/errorHandler";

const updateSellerProfile = async (req: Request | any, res: Response) => {
  const { shop_category, shop_name, phone, region, shop_desc, address } =
    req.body;
  try {
    // @TODO, shop icon
    await Seller.update(
      {
        shop_category,
        shop_name,
        delivery_zone:address,
        shop_desc,
        phone,
        region,
      },
      {
        where: {
          user_id: req.seller.user_id,
        },
      }
    );
    return res.status(mainConfig.status.ok).json({
      msg: "Seller Profile Updated",
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

export default updateSellerProfile;
