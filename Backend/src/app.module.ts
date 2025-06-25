import express from "express";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";
import { authenticate } from "./middlewares/authentication";
import { SessionModule } from "./modules/session/session.module";
import {
  rolesAuthorization,
  permissionsAuthorization,
} from "./middlewares/authorization";
import { ProductModule } from "./modules/product/product.module";

export class AppModule {
  static setup(app: express.Application) {
    // auth routes
    app.use("/auth", AuthModule);
    // Protected routes
    app.use(
      "/users",
      authenticate,
      permissionsAuthorization(["create:product"]),
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
