import { Request, Response } from "express";
import mainConfig from "../../config/main";
import errorHandler from "../../utils/errorHandler";

const getSellerProfile = async (req: Request | any, res: Response) => {
  const {
    shop_icon,
    shop_category,
    address,
    phone,
    shop_name,
    KYCverified,
    product_sold,
  } = req.seller;
  try {
    return res.status(mainConfig.status.ok).json({
      msg: "Seller Profile Retrieved",
      data: {
        shop_icon,
        shop_category,
        phone,
        address,
        shop_name,
        KYCverified,
        product_sold,
      },
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

export default getSellerProfile;
