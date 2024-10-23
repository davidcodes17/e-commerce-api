import { Router } from "express";
import mainConfig from "../config/main";
import becomeSeller from "../controllers/sellers/becomeSeller";
import verifyToken from "../middlewares/verifyToken";
import {
  becomeSellerValidator,
  validationError,
} from "../middlewares/validator";
import getSellerProfile from "../controllers/sellers/getSellersProfile";
import verifySeller from "../middlewares/verifySeller";
import updateSellerProfile from "../controllers/sellers/updateSeller";
import uploadShopIcon from "../controllers/sellers/uploadShopIcon";
import multer from "multer";

const sellerRoute = Router();

sellerRoute.post(
  mainConfig.routes.becomeSeller,
  verifyToken,
  becomeSellerValidator,
  validationError,
  becomeSeller
);
sellerRoute.get(
  mainConfig.routes.sellerProfile,
  verifyToken,
  verifySeller,
  getSellerProfile
);
sellerRoute.put(
  mainConfig.routes.sellerProfile,
  verifyToken,
  verifySeller,
  updateSellerProfile
);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
sellerRoute.post(
  mainConfig.routes.sellerProfileAvatar,
  verifyToken,
  verifySeller,
  upload.single("shop_icon"),
  uploadShopIcon
);

export default sellerRoute;
