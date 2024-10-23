import { NextFunction, Response } from "express";
import mainConfig from "../config/main";
import { IRequest } from "../types/express";
import { verify } from "../utils/token";
import User from "../models/User";
import Seller from "../models/Seller";
import errorHandler from "../utils/errorHandler";

export default async (req: IRequest|any, res: Response, next: NextFunction) => {
  const AuthHeader = req.headers.authorization;

  try {
    if (AuthHeader) {
      const [bearer, token] = AuthHeader.split(" ");

      if (bearer && token) {
        const jwt: any = await verify(token);
        if (!jwt) {
          return next();
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
        //   account_balance,
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
          avatar: !avatarId ? process.env.BACKEND_BASE_URL + avatar : avatar,
          lastLogin,
          createdAt,
        //   account_balance,
          verified,
          isSeller,
          uuid,
        };

        if (user) {
          req.user = clientUser;
          return next();
        }

        return next();
      }
    }
    return next();
  } catch (error) {
    errorHandler(res, error);
  }
};
