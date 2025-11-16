import { Router } from "express";
import { CartController } from "./controllers/cart.controller";

export const CartModule = Router();

const cart_controller = new CartController();

CartModule.get("/", cart_controller.getAllCartItemHandler);
CartModule.post("/", cart_controller.createCartHanlder);
CartModule.post("/items", cart_controller.createCartItemHandler);
CartModule.patch("/item/:id/select", cart_controller.updateCartItemHandler);
