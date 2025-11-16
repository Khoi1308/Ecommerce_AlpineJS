import { Router } from "express";
import { ShippingController } from "./controllers/shipping.controller";
import { authenticate } from "../../middlewares/authentication.middleware";
import { rolesAuthorization } from "../../middlewares/authorization.middleware";

export const ShippingModule = Router();

const shipping_controller = new ShippingController();

// -- ZONEs
// POST /admin/shipping/zones
ShippingModule.post(
  "/zones/",
  rolesAuthorization("admin"),
  shipping_controller.createShippingZoneHandler,
);

// GET /admin/shipping/zones
// GET /admin/shipping/zones/:zoneId
ShippingModule.get(
  "/zones/:id",
  rolesAuthorization("admin"),
  shipping_controller.findOneShippingZoneHandler,
);

// -- RATEs
// POST /admin/rates
ShippingModule.post(
  "/rates/",
  rolesAuthorization("admin"),
  shipping_controller.createShippingRateHandler,
);
// GET /admin/rates
// GET /admin/rates/:rateId
ShippingModule.get(
  "/rates/:id",
  rolesAuthorization("admin"),
  shipping_controller.getShippingRateByIdHandler,
);
