import { Router } from "express";

import userController from "../controllers/user.controller.js";

import { validId, validUser, ownerOrAdminMiddleware } from "../middlewares/global.middlewares.js";

import authMiddleware from "../middlewares/auth.middleware.js";

import adminMiddleware from "../middlewares/admin.middleware.js";

const route = Router();


route.post("/", userController.createUser);

route.get("/", authMiddleware, adminMiddleware, userController.findAllUsers);

route.get("/:id", authMiddleware, validId, validUser, userController.findUserById);

route.patch("/:id", authMiddleware, validId, validUser, ownerOrAdminMiddleware, userController.updateUser);

route.delete("/:id", authMiddleware, validId, validUser, userController.deleteUserById);


export default route;