import { CREATED, NOT_FOUND, SUCCESS } from "../../../config/http";
import { appAssert } from "../../../utils/appAssert";
import { catchErrors } from "../../../utils/catchErrors";
import { CategoryService } from "../services/category.service";

export class CategoryController {
  private category_service: CategoryService;

  constructor() {
    this.category_service = new CategoryService();
  }

  createCategoryHandler = catchErrors(async (req, res) => {
    // Validate category
    const category_data = req.body;
    // Get category with service
    const category = await this.category_service.createCategory(category_data);
    // Response
    res.status(CREATED).json({
      succes: true,
      data: category,
    });
  });

  getAllCategoryHandler = catchErrors(async (req, res) => {
    const categories = await this.category_service.findAll();
    appAssert(categories, NOT_FOUND, "not found category");

    res.status(SUCCESS).json({
      succes: true,
      data: categories,
    });
  });
}
