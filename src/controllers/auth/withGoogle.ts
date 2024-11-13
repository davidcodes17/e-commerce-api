import { Request, Response } from "express";
import { generate } from "../../utils/token";
import errorHandler from "../../utils/errorHandler";

export default async (req: Request, res: Response) => {
  try {
    const token = await generate({
      _id: req.user as string,
    });
    res.redirect(`${process.env.FRONTEND_BASE_URL}?code=${token}&type=google`);
  } catch (error) {
    return errorHandler(res, error);
  }
};
