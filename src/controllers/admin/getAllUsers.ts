import mainConfig from "../../config/main";
import { Request, Response } from "express";
import errorHandler from "../../utils/errorHandler";
import User, { ROLE } from "../../models/User";

const getAllUsers = async (req: any, res: Response) => {
  try {
    // const { limit, offset } = req.query;
    const users = await User.findAll({
      where: {
        role: ROLE.user,
      },
      attributes: [
        "uuid",
        "username",
        "firstName",
        "lastName",
        "phone",
        "email",
        "role",
        "restricted",
        "lastLogin",
        "avatar",
        "verified",
      ],
    });

    return res.status(mainConfig.status.ok).json({
      msg: "users Rerieved",
      data: users,
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

export default getAllUsers;
