import { Router } from "express";
import { getUserHandler } from "./controllers/user.controller";
import { ProductModule } from "../product/product.module";

export const UserModule = Router();

// Prefix: /user/
UserModule.get("/", getUserHandler);
