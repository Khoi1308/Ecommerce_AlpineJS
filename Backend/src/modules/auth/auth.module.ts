import { Router } from "express";
import { registerHandler } from "./constrollers/auth.controller";

export const AuthModule = Router();

AuthModule.post("/register", registerHandler);
