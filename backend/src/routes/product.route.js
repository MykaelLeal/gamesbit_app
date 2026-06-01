import { Router } from "express";

import productController from "../controllers/product.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

import adminMiddleware from "../middlewares/admin.middleware.js";

import { validId } from "../middlewares/global.middlewares.js";

const route = Router();


route.get("/", productController.findAllProducts);

route.get("/search", productController.searchProducts);

route.get("/category/:category", productController.findProductsByCategory);

route.get("/platform/:platform", productController.findProductsByPlatform);

route.get("/:id", validId, productController.findProductById);

route.post("/", authMiddleware, adminMiddleware, productController.createProduct);

route.patch("/:id", authMiddleware, adminMiddleware, validId, productController.updateProduct);

route.delete("/:id", authMiddleware, adminMiddleware, validId, productController.deleteProductById);

export default route;