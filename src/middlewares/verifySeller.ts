import { NextFunction, Request, Response } from "express";
// import User from "../models/User";
import mainConfig from "../config/main";
import errorHandler from "../utils/errorHandler";
import User from "../models/User";

const verifySeller = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_is_seller = await User.findOne({
      where: {
        root: true,
      },
    });

    if (user_is_seller) {
      return next();
    }

    return res.status(mainConfig.status.unauthorized).json({
      msg: "Unauthorized",
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

export default verifySeller;
