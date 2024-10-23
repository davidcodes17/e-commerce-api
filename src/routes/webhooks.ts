import { Router } from "express";
import flutterCallback from "../controllers/webhooks/flutterCallback";

const webhooksRoutes = Router();

webhooksRoutes.get("/flutter", flutterCallback)

export default webhooksRoutes