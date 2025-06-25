import { CREATED } from "../../../config/http";
import { catchErrors } from "../../../utils/catchErrors";
import { ProductService } from "../services/product.service";

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  createProductHandler = catchErrors(async (req, res) => {
    const productData = req.body;
    const imageFiles = req.files as Express.Multer.File[];
    const new_product = await this.productService.createProduct(
      productData,
      imageFiles,
    );

    res.status(CREATED).json({
      success: true,
      message: "Product created successfully",
      data: new_product,
    });
  });
}
