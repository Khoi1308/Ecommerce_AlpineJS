import { Router } from "express";
import { AddressController } from "./controllers/address.controller";

export const AddressModule = Router();

const addressController = new AddressController();

// GET: All
AddressModule.post("/", addressController.createAddressHandler);
