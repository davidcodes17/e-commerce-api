import mainConfig from "../../config/main";
import { Request, Response } from "express";
import errorHandler from "../../utils/errorHandler";

const getProfile = async (req: any, res: Response) => {
  try {
    return res.status(mainConfig.status.ok).json({
      msg: "Profile Rerived",
      data: req.user,
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

export default getProfile;
