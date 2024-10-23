import mainConfig from "../config/main";
import { NextFunction, Request, Response } from "express";
import { verify } from "../utils/token";
import User from "../models/User";
import errorHandler from "../utils/errorHandler";
const verifyToken = async (req: any, res: Response, next: NextFunction) => {
  try {
    const AuthHeader = req.headers.authorization;

    if (AuthHeader) {
      const [bearer, token] = AuthHeader.split(" ");

      if (bearer && token) {
        verify(token)
          .then(async (jwt: any) => {
            if (!jwt) {
              return res.status(mainConfig.status.unauthorized).json({
                msg: "Token Expired",
              });
            }

            const user = await User.findOne({
              where: {
                uuid: jwt._id,
              },
            });

            const {
              username,
              firstName,
              lastName,
              phone,
              email,
              _2FA,
              locale,
              avatarId,
              avatar,
              lastLogin,
              createdAt,
              // account_balance,
              verified,
              isSeller,
              uuid,
            } = user?.get();
            const clientUser = {
              username,
              firstName,
              lastName,
              phone,
              email,
              _2FA,
              locale,
              avatar: !avatarId
                ? process.env.BACKEND_BASE_URL + avatar
                : avatar,
              lastLogin,
              createdAt,
              // account_balance,
              verified,
              isSeller,
              uuid,
            };
            if (user) {
              req.user = clientUser;
              return next();
            }
            
            return res.status(mainConfig.status.unauthorized).json({
              msg: "Could not complete request",
            });
          })
          .catch((e) => {
            console.log(e);
            return res.status(mainConfig.status.unauthorized).json({
              msg: "Invalid Token",
            });
          });
        return;
      }
    }

    return res.status(mainConfig.status.unauthorized).json({
      msg: "Invalid Authorization !!!",
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

export default verifyToken;
