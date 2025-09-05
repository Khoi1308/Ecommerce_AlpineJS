import { Router } from "express";
import { BannerController } from "./banner.controller";
import { authenticate } from "../../middlewares/authentication.middleware";
import { rolesAuthorization } from "../../middlewares/authorization.middleware";

export const BannerModule = Router();

const banner_controller = new BannerController();

BannerModule.get("/", banner_controller.getAllBannerHandler);
BannerModule.post(
  "/",
  authenticate,
  rolesAuthorization("admin"),
  banner_controller.createBannerHandler,
);
