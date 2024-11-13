import { NextFunction, Request, Response } from "express";
// import User from "../models/User";
import mainConfig from "../config/main";
import errorHandler from "../utils/errorHandler";
import User, { ROLE } from "../models/User";

const verifyAdmin = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const isAdmin = req.user.role;
    if (isAdmin != "admin") {
      return res.status(mainConfig.status.unauthorized).json({
        msg: "Unauthorized Access",
      });
    }

    return next();
  } catch (error) {
    return errorHandler(res, error);
  }
};

export default verifyAdmin;
