import { Request, Response } from "express";
import mainConfig from "../../config/main";
import User from "../../models/User";
import errorHandler from "../../utils/errorHandler";

const updateProfile = async (req: any, res: Response) => {
  try {
    const { username, firstName, lastName, phone, locale } = req.body;

    await User.update(
      {
        username,
        firstName,
        lastName,
        phone,
        locale,
      },
      {
        where: {
          uuid: req.user.uuid,
        },
      }
    );

    return res.status(mainConfig.status.ok).json({
      msg: "User Profile Updated",
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

export default updateProfile;
