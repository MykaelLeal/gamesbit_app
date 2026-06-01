import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";

import {
  getWishlist,
  addProductToWishlist,
  removeProductFromWishlist,
  clearWishlist,
  checkWishlistProduct,
} from "../controllers/wishlist.controller.js";

const router = Router();

router.post("/products", authMiddleware, addProductToWishlist);

router.get("/", authMiddleware, getWishlist);

router.get("/check/:productId", authMiddleware, checkWishlistProduct);

router.delete("/products/:productId", authMiddleware, removeProductFromWishlist);

router.delete("/clear", authMiddleware, clearWishlist);

export default router;