import { Router } from "express";
import { uploadImages } from "../../middlewares/multer.middleware";
import { ProductController } from "./controllers/product.controller";

export const ProductModule = Router();

const productController = new ProductController();
// GET: All method
ProductModule.get("/", productController.getAllProductHandler);
// POST
ProductModule.post("/", productController.createProductHandler);
// PUT
ProductModule.put(
  "/:id",
  uploadImages.array("images", 10),
  productController.updateProductHandler,
);
// DELETE
ProductModule.delete("/:id", productController.deleteProductHandler);

// GET product by ID
ProductModule.get("/:id", productController.getProductById);

// Modify images
ProductModule.post(
  "/add/images/:id",
  uploadImages.array("images", 10),
  productController.addImageHandler,
);

ProductModule.delete(
  "/delete/images/:id",
  productController.deleteImageHandler,
);
