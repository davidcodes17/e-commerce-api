import { NextFunction, Request, Response } from "express";
import errorHandler from "../utils/errorHandler";
import { productImages } from "../routes/productRoutes";
import multer from "multer";
import mainConfig from "../config/main";

export const newProductMulterHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    productImages(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ msg: "File Error: " + err.message });
      } else if (err) {
        return errorHandler(res, err);
      }
      return next();
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};
