import { Router } from "express";
import mainConfig from "../config/main";
import verifyToken from "../middlewares/verifyToken";
import { newProductMulterHandler } from "../middlewares/multerHandler";
import { newProductValidator, validationError } from "../middlewares/validator";
import createNew from "../controllers/admin/createNew";

const adminRoutes = Router();

adminRoutes.post(
  mainConfig.routes.newProduct,
  verifyToken,
  newProductMulterHandler,
  newProductValidator,
  validationError,
  createNew
);

export default adminRoutes;
