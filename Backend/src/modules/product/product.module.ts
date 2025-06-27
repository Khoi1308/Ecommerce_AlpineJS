import { Router } from "express";
import { uploadImages } from "../../middlewares/multer.middleware";
import { ProductController } from "./controllers/product.controller";

export const ProductModule = Router();

const productController = new ProductController();
// GET: All method
ProductModule.get("/", productController.getAllProductHandler);
// POST
ProductModule.post(
  "/",
  uploadImages.array("images", 10),
  productController.createProductHandler,
);
// PUT
ProductModule.put("/:id", productController.updateProductHandler);
// GET product by ID
ProductModule.get("/:id", productController.getProductById);
