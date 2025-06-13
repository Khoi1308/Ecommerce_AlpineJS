import express from "express";
import { AuthModule } from "./modules/auth/auth.module";

export class AppModule {
  static setup(app: express.Application) {
    // auth routes
    app.use("/auth", AuthModule);
  }
}
