import { Router } from "express";
import { UserController } from "./controllers/user.controller";
import { uploadImage } from "../../middlewares/multer.middleware";

export const UserModule = Router();

const userController = new UserController();
// Prefix: /user/
UserModule.get("/", userController.getUserHandler);
UserModule.post("/address", userController.createAddressInUserHandler);

// Avatar
UserModule.post("/avatar/image", uploadImage.single("image"), userController.uploadAvatarHandler);
UserModule.post("/avatar/", userController.createAvatarHandler);
UserModule.put("/:id", userController.updateAvatarHandler);
UserModule.get("/avatar/", userController.getAvatarByUserIdHandler);
