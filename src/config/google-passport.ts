import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import mainConfig from "./main";
import User from "../models/User";
import sendEmail from "../utils/sendEmail";
import { nanoid } from "nanoid";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: `${process.env.BACKEND_BASE_URL}/auth${mainConfig.routes.googleCallback}`,
    },
    async (accessToken, refreshToken, profile, done) => {
      const {
        sub,
        name,
        given_name,
        family_name,
        picture,
        email_verified,
        locale,
        email,
      } = profile._json;

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (user) {
        const user_id = user.get().uuid;
        return done(null, user_id);
      }

      //   create new user
      const new_user = await User.create({
        uuid:nanoid(),
        username: name,
        email,
        firstName: given_name,
        lastName: family_name,
        avatar: picture,
        avatarId: "google",
        verfied: email_verified,
        locale,
        auth_id: sub,
        auth_type: "google",
      });
      await new_user.save();

      // send email to new user
      await sendEmail({
        to: new_user.get().email,
        subject: "Welcome to Cart Royal",
        path: "src/emails/welcome.ejs",
        data: {
          URL: process.env.BACKEND_BASE_URL,
          name: new_user.get().email.split("@")[0],
        },
      }).catch(() => console.log("NODEMAILER ERROR"));

      return done(null, new_user.get().uuid);
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((obj: any, done) => {
  done(null, obj);
});
