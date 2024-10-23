import { decrypt } from "../../utils/password";
import { generate } from "../../utils/token";
import { Request, Response } from "express";
import UserModel from "../../models/User";
import mainConfig from "../../config/main";
import errorHandler from "../../utils/errorHandler";
import User from "../../models/User";
const login = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({
      where: {
        email: req.body.email,
      },
    });
    // return error if not match
    if (!user) {
      return res
        .status(mainConfig.status.notFound)
        .json({ msg: "Email or Password is Incorrect" });
    }

    const user_data = user.get();
    // if signed in with other method
    if (!user.get().password || (user.get().auth_type && user.get().auth_id)) {
      return res.status(mainConfig.status.conflict).json({
        msg: `You have to Sign in with ${user.get().auth_type}`,
      });
    }

    // compare passwords
    const checkPassword: any = await decrypt(
      req.body.password,
      user_data.password
    );
    if (!checkPassword)
      return res
        .status(mainConfig.status.notAcceptable)
        .json({ msg: "Email or Password is Incorrect" });

    // PASSWORD IS CORRECT
    if (user_data._2FA) {
      // send otp / link - to email
      return;
    }
    // generate token
    const token = await generate({
      _id: user_data.uuid,
    });
    // set last login date
   await User.update({
      lastLogin: new Date()
    },{where:{
      uuid: user_data.uuid,
      id: user_data.id,
      email: user_data.email,
    }})
    // user_data.lastLogin = new Date();
    // await user_data.save()
    return res
      .status(mainConfig.status.ok)
      .json({ msg: "Login successful", token });
  } catch (error) {
    return errorHandler(res, error);
  }
};

export default login;
