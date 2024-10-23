import { Router } from "express";
import addCart from "../controllers/cart/addCart";
import verifyToken from "../middlewares/verifyToken";
import { addCartValidator, checkOutValidator, removeCartValidator, validationError } from "../middlewares/validator";
import getCart from "../controllers/cart/getCart";
import removeCart from "../controllers/cart/removeCart";
import mainConfig from "../config/main";
import checkout from "../controllers/cart/checkout";

const cartRoutes = Router();

cartRoutes.post(
  mainConfig.routes.addCart,
  verifyToken,
  addCartValidator,
  validationError,
  addCart
);
cartRoutes.get("/", verifyToken, getCart);
cartRoutes.delete(
  "/",
  verifyToken,
  removeCartValidator,
  validationError,
  removeCart
);

cartRoutes.post(mainConfig.routes.checkout, verifyToken,checkOutValidator, validationError, checkout);

export default cartRoutes;
