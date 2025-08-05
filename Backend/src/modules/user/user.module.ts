import { Router } from "express";
import { UserController } from "./controllers/user.controller";

export const UserModule = Router();

const userController = new UserController();
// Prefix: /user/
UserModule.get("/", userController.getUserHandler);
UserModule.post("/address", userController.createAddressInUserHandler);
// UserModule.put("/:id", userController.updateUserHandler);
