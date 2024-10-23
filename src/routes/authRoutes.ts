import { Router } from "express";
import mainConfig from "../config/main";
import {
  forgottenPasswordValidator,
  loginValidator,
  signupValidator,
  validationError,
  verifyValidator,
} from "../middlewares/validator";
import signup from "../controllers/auth/signup";
import login from "../controllers/auth/login";
import forgottenPassword from "../controllers/auth/forgotten-password";
import verifyAuth from "../controllers/auth/verify";
import withGoogle from "../controllers/auth/withGoogle";
import passport from "passport";

const authRoutes = Router();

authRoutes.post(
  mainConfig.routes.signup,
  signupValidator,
  validationError,
  signup
);
authRoutes.post(
  mainConfig.routes.login,
  loginValidator,
  validationError,
  login
);
authRoutes.post(
  mainConfig.routes.forgottenPasword,
  forgottenPasswordValidator,
  validationError,
  forgottenPassword
);

authRoutes.post(
  mainConfig.routes.verifyAuth,
  verifyValidator,
  validationError,
  verifyAuth
);

authRoutes.get(
  mainConfig.routes.withGoogle,
  passport.authenticate("google", {
    scope: ["profile", "email"],
    failureRedirect: `${process.env.FRONTEND_BASE_URL}/auth/login?error=Google_Authentication_Failed`,
  })
);

authRoutes.get(
  mainConfig.routes.googleCallback,
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_BASE_URL}/auth/login?error=Google_Authentication_Failed`,
  }),
  withGoogle
);

export default authRoutes;
