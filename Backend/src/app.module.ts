import express from "express";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";
import { authenticate } from "./middlewares/authentication.middleware";
import { SessionModule } from "./modules/session/session.module";
import {
  rolesAuthorization,
} from "./middlewares/authorization.middleware";
import { ProductModule } from "./modules/product/product.module";

export class AppModule {
  static setup(app: express.Application) {
    // auth routes
    app.use("/auth", AuthModule);
    // Protected routes
    app.use(
      "/users",
      authenticate,
      rolesAuthorization("customer"),
      UserModule,
    );
    app.use(
      "/sessions",
      authenticate,
      rolesAuthorization("customer"),
      SessionModule,
    );

    app.use(
      "/products",
      authenticate,
      rolesAuthorization("admin"),
      ProductModule,
    );
  }
}
