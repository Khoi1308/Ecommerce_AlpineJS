import { catchErrors } from "../../../utils/catchErrors";
import { CategoryService } from "../services/category.service";

export class CategoryController {
  private category_service: CategoryService;

  constructor() {
    this.category_service = new CategoryService();
  }

  createCategoryHandler = catchErrors(async (req, res) => {
    // Validate category
    // Get category with service
    // Response
  });
}
