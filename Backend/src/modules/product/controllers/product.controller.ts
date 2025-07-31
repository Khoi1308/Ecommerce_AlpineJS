import { CREATED, SUCCESS } from "../../../config/http";
import { catchErrors } from "../../../utils/catchErrors";
import { UpdateProductDto } from "../dtos/update_product.dto";
import { ProductService } from "../services/product.service";

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  // Get All products
  getAllProductHandler = catchErrors(async (req, res) => {
    const products = await this.productService.getAllProducts();

    res.status(SUCCESS).json({
      success: true,
      data: products,
    });
  });

  // Get product by ID
  getProductById = catchErrors(async (req, res) => {
    const products = await this.productService.getProductById(req.params.id);

    res.status(SUCCESS).json({
      data: products,
    });
  });

  // Create product
  createProductHandler = catchErrors(async (req, res) => {
    const userId = req.userId;
    const productData = req.body;
    const new_product = await this.productService.createProduct(
      productData,
      userId,
    );

    res.status(CREATED).json({
      success: true,
      message: "Product created successfully",
      data: new_product,
    });
  });

  // Update product
  updateProductHandler = catchErrors(async (req, res) => {
    const { id } = req.params;
    const update_data: UpdateProductDto = req.body;
    const imageFiles = req.files as Express.Multer.File[];

    // Parse remove images
    if (req.body.removeImages) {
      update_data.removeImages = JSON.parse(req.body.removeImages);
    }

    // Add images
    if (imageFiles && imageFiles.length > 0) {
      update_data.addImages = imageFiles;
    }

    const updated_product = await this.productService.updateProduct(
      id,
      update_data,
    );

    res.status(SUCCESS).json({
      success: true,
      message: updated_product.hasChange
        ? "Product's data updated successfully"
        : "No changes detected",
      data: updated_product.product,
      hasChange: updated_product.hasChange,
    });
  });

  deleteProductHandler = catchErrors(async (req, res) => {
    const { id } = req.params;
  });

  deleteImageHandler = catchErrors(async (req, res) => {
    const { id } = req.params;

    const { images } = req.body;
    const product = await this.productService.deleteImagesInProduct(id, images);

    res.status(SUCCESS).json({
      success: true,
      message: "Images are deleted",
      data: product,
    });
  });

  addImageHandler = catchErrors(async (req, res) => {
    const image_files = req.files as Express.Multer.File[];

    const img_urls = await this.productService.addImages(image_files);

    res.status(SUCCESS).json({
      success: true,
      message: "Images are uploaded",
      data: img_urls,
    });
  });
}
