import { CREATED, SUCCESS } from "../../../config/http";
import { catchErrors } from "../../../utils/catchErrors";
import { Product } from "../entities/product.entity";
import { ProductService } from "../services/product.service";

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  // Get All products
  getAllProductHandler = catchErrors(async (req, res) => {
    const products = await this.productService.findAllProduct();

    res.status(SUCCESS).json({
      success: true,
      data: products,
    });
  });

  // Get product by ID
  getProductById = catchErrors(async (req, res) => {
    const products = await this.productService.findProductById(req.params.id);

    res.status(SUCCESS).json({
      data: products,
    });
  });

  // Create product
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

  // Update product
  updateProductHandler = catchErrors(async (req, res) => {
    // const productData = req.body;
    // const
  });
}
