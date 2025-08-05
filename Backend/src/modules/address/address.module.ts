import { Router } from "express";
import { AddressController } from "./controllers/address.controller";

export const AddressModule = Router();

const addressController = new AddressController();

AddressModule.post("/", addressController.createAddressHandler);
AddressModule.put("/:id", addressController.updateAddressHandler);
AddressModule.get("/user", addressController.getAllByUserIdHandler);
AddressModule.get("/:id", addressController.getAddressHandler);
