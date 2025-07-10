import { Router } from "express";
import { CategoryController } from "./controllers/category.controller";

export const CategoryModule = Router();

const category_controller = new CategoryController();

CategoryModule.post("/", category_controller.createCategoryHandler);
