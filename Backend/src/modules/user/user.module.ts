import { Router } from "express";
import { getUserHandler } from "./controllers/user.controller";

export const UserModule = Router();

// Prefix: /user/
UserModule.get("/", getUserHandler);
