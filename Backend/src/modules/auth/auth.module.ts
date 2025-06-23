import { Router } from "express";
import {
  registerHandler,
  loginHandler,
  logoutHandler,
  refreshHandler,
  verifyEmailHandler,
  sendPasswordResetHandler,
  resetPasswordHandler,
} from "./constrollers/auth.controller";

export const AuthModule = Router();

// Prefix: /auth/
AuthModule.post("/register", registerHandler);
AuthModule.post("/login", loginHandler);
AuthModule.get("/refresh", refreshHandler);
AuthModule.get("/logout", logoutHandler);
AuthModule.get("/email/verify/:code", verifyEmailHandler);
AuthModule.post("/password/forgot", sendPasswordResetHandler);
AuthModule.post("/password/reset", resetPasswordHandler);
