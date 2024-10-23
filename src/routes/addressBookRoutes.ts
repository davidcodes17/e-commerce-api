import { Router } from "express";
import mainConfig from "../config/main";
import createNew from "../controllers/address-book/createNew";
import { newAddressValidator, updateAddressValidator, validationError } from "../middlewares/validator";
import verifyToken from "../middlewares/verifyToken";
import getAll from "../controllers/address-book/getAll";
import editAddress from "../controllers/address-book/editAddress";
import makeDefault from "../controllers/address-book/makeDefault";

const addressBookRoutes = Router();
addressBookRoutes.get("/", verifyToken, getAll);

addressBookRoutes.post(
  mainConfig.routes.addAddressBook,
  verifyToken,
  newAddressValidator,
  validationError,
  createNew
);

addressBookRoutes.put(
  mainConfig.routes.editAddressBook,
  verifyToken,
  updateAddressValidator,
  validationError,
  editAddress
);


addressBookRoutes.put(
  mainConfig.routes.defaultAddressBook,
  verifyToken,
  makeDefault
);
export default addressBookRoutes;
