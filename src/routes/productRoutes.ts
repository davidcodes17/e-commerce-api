import { Router } from "express";
import mainConfig from "../config/main";
import verifyToken from "../middlewares/verifyToken";
import verifySeller from "../middlewares/verifySeller";
import multer from "multer";
import { newProductValidator, validationError } from "../middlewares/validator";
import getProducts from "../controllers/products/getProducts";
import getSingleProduct from "../controllers/products/getSingleProduct";
import conditionVerify from "../middlewares/conditionVerify";
import { newProductMulterHandler } from "../middlewares/multerHandler";
import path from "path";

const productRoutes = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "/uploads"),);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

export const productImages = upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "other_images", maxCount: 4 },
]);


// /product GET
productRoutes.get("/",conditionVerify, getProducts);
productRoutes.get("/:uuid",conditionVerify, getSingleProduct);
export default productRoutes;
