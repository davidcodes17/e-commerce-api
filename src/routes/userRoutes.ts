import { Router } from "express";
import mainConfig from "../config/main";
import getProfile from "../controllers/users/getProfile";
import verifyToken from "../middlewares/verifyToken";
import updateProfile from "../controllers/users/updateProfile";
import uploadAvatar from "../controllers/users/uploadAvatar";
import multer from "multer";

const userRoutes = Router();

userRoutes.get(mainConfig.routes.userProfile, verifyToken, getProfile);
userRoutes.put(mainConfig.routes.userProfile, verifyToken, updateProfile);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

userRoutes.post(
  mainConfig.routes.userUploadAvatar,
  verifyToken,
  upload.single("avatar"),
  uploadAvatar
);

export default userRoutes;
