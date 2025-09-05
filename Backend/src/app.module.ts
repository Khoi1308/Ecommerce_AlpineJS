import express from "express";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";
import { authenticate } from "./middlewares/authentication.middleware";
import { SessionModule } from "./modules/session/session.module";
import { rolesAuthorization } from "./middlewares/authorization.middleware";
import { ProductModule } from "./modules/product/product.module";
import { AddressModule } from "./modules/address/address.module";
import { CategoryModule } from "./modules/category/category.module";
import { BannerModule } from "./modules/banner/banner.module";

export class AppModule {
  static setup(app: express.Application) {
    // auth routes
    app.use("/auth", AuthModule);
    // Protected routes
    app.use("/users", authenticate, UserModule);
    app.use("/addresses", authenticate, AddressModule);
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

    app.use("/addresses", authenticate, AddressModule);
    app.use(
      "/categories",
      authenticate,
      rolesAuthorization("admin"),
      CategoryModule,
    );

    app.use("/banners", BannerModule);
  }
}
