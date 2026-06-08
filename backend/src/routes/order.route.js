import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";

import {
  createOrder,
  getMyOrders,
  getAllOrders,
} from "../controllers/order.controller.js";

const router = Router();

router.post("/", authMiddleware, createOrder);

router.get("/my-orders", authMiddleware, getMyOrders);

router.get("/admin/all", authMiddleware, adminMiddleware, getAllOrders);

export default router;