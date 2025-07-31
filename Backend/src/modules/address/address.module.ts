import { Router } from "express";
import { AddressController } from "./controllers/address.controller";

export const AddressModule = Router();

const addressController = new AddressController();

AddressModule.post("/", addressController.createAddressHandler);

AddressModule.get("/:id", addressController.getAddressHandler);


