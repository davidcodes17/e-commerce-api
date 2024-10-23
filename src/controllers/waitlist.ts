import { Request, Response } from "express";
import errorHandler from "../utils/errorHandler";
import Waitlist from "../models/Waitlist";
import mainConfig from "../config/main";
import sendEmail from "../utils/sendEmail";
import { nanoid } from "nanoid";

const addWaitlist = async (req: Request, res: Response) => {
  try {
    const { type, email } = req.body;

    const findWaitlist = await Waitlist.findOne({
      where: {
        email,
      },
      attributes: ["email", "type"],
    });

    if (findWaitlist) {
      return res.status(mainConfig.status.ok).json({
        msg: "You are already on the waitlist",
      });
    }

    const newWaitlist = await Waitlist.create({
      email,
      type,
      uuid:nanoid()
    });
    await newWaitlist.save();
    // send email
    await sendEmail({
      to: email,
      subject: "Sneak Peek: Cart Royal Unveiling Soon!",
      path: "src/emails/waitlist.ejs",
      data: {
        URL: process.env.BACKEND_BASE_URL,
        name: email.split("@")[0],
      },
    }).catch(console.log);
    return res.status(mainConfig.status.created).json({
      msg: "You have been added to our waitlist",
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

export default addWaitlist;
