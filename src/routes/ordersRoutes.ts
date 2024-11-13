import { Router } from "express";
import getOrders from "../controllers/orders/getOrders";

const ordersRoutes = Router();

ordersRoutes.get("/", getOrders);

export default ordersRoutes;
