import { Router } from "express";
import mainConfig from "../config/main";
import checkUser from "../controllers/general/checkUser";
import { checkUserValidator, validationError } from "../middlewares/validator";

const generalRoutes = Router();
generalRoutes.get(
  "/check-user",
  checkUserValidator,
  validationError,
  checkUser
);
export default generalRoutes;
