import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";

import {
  getCart,
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  clearCart,
} from "../controllers/cart.controller.js";

const router = Router();

router.get("/", authMiddleware, getCart);

router.post("/items", authMiddleware, addItemToCart);

router.put("/items/:productId", authMiddleware, updateItemQuantity);

router.delete("/items/:productId", authMiddleware, removeItemFromCart);

router.delete("/clear", authMiddleware, clearCart);

export default router;