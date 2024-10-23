import { Request, Response } from "express";

import { encrypt } from "../../utils/password";
import { generate } from "../../utils/token";
import mainConfig from "../../config/main";
import User from "../../models/User";
import sendEmail from "../../utils/sendEmail";
import errorHandler from "../../utils/errorHandler";
import * as uuid from "uuid"
import { nanoid } from "nanoid";
const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    // checking if email exists
    const email_exists = await User.findOne({
      where: {
        email,
      },
    });

    if (email_exists) {
      return res.status(mainConfig.status.conflict).json({
        msg: `Email Already Exists`,
      });
    }

    // hash the password
    const hash = await encrypt(password);
    // created the user
    const user = await User.create({
      email,
      uuid:nanoid(),
      password: hash,
    });
    await user.save();
    const token = await generate({
      _id: user.get().uuid,
    });

    await sendEmail({
      to: user.get().email,
      subject: "Welcome to Cart Royal",
      path: "src/emails/welcome.ejs",
      data: {
        URL: process.env.BACKEND_BASE_URL,
        name: user.get().email.split("@")[0],
      },
    }).catch(() => console.log("NODEMAILER ERROR"));

    return res.status(mainConfig.status.created).json({
      msg: "Account Created Successfully",
      token,
    });
  } catch (error) {
    return errorHandler(res, error);
  }
};

export default signup;
