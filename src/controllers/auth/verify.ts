import mainConfig from "../../config/main";
import { Request, Response } from "express";
import Token from "../../models/Token";
import User from "../../models/User";
import { encrypt } from "../../utils/password";
import { generate } from "../../utils/token";
import errorHandler from "../../utils/errorHandler";

const verifyAuth = async (req: Request, res: Response) => {
  try {
    const { token, type, newPassword } = req.body;

    if (
      type.match(/reset$/i) &&
      (!newPassword || newPassword.trim().length < 6)
    ) {
      return res.status(mainConfig.status.notAcceptable).json({
        msg: "newPassword must be more than 6 characters when type is 'RESET'",
      });
    }

    const getToken = await Token.findOne({
      where: {
        type,
        token,
      },
    });

    if (!getToken) {
      return res.status(mainConfig.status.unavailable).json({
        msg: "Token Expired",
      });
    }

    const tokendetails = getToken?.get();

    const currentDate = new Date();
    const tokenDate = new Date(tokendetails.expiresOn);

    // utils func
    const deleteToken = async () => {
      return await Token.destroy({
        where: {
          type,
          token,
        },
      });
    };

    if (currentDate > tokenDate) {
      await deleteToken();
      return res.status(mainConfig.status.unavailable).json({
        msg: "Token has expired",
      });
    }

    // reset password
    if (type == "reset") {
      const password = await encrypt(newPassword);

      await User.update(
        {
          password,
        },
        {
          where: {
            uuid: tokendetails.user_id,
          },
        }
      );

      const tk = await generate({
        _id: tokendetails.user_id,
      });

      await deleteToken();
      return res.status(mainConfig.status.ok).json({
        msg: "Password Changed",
        token: tk,
      });
    } else if (type == "verify") {
      // ....
    }

    return res.status(mainConfig.status.unavailable).json({
      msg: "Invalid Request ('RESET | VERIFY')",
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

export default verifyAuth;
