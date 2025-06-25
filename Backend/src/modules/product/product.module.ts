import { Router } from "express";
import { uploadImages } from "../../middlewares/multer.middleware";
import { ProductController } from "./controllers/product.controller";

export const ProductModule = Router();

const productController = new ProductController();
ProductModule.post(
  "/",
  uploadImages.array("images", 10),
  productController.createProductHandler,
);
