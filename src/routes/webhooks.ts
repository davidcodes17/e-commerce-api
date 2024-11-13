import { Router } from "express";
import flutterCallback from "../controllers/webhooks/flutterCallback";

const webhooksRoutes = Router();

webhooksRoutes.use("/flutter", flutterCallback)

export default webhooksRoutes