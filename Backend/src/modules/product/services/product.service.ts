import { Repository } from "typeorm";
import { Book, Clothing, Product } from "../entities/product.entity";
import { AppData } from "../../../config/db";
import { CreateProductDto } from "../dtos/create_product.dto";
import fs from "fs";
import { uploadMultipleImages } from "../../../utils/uploadImage";

export class ProductService {
  private productRepository: Repository<Product>;
  private bookRepository: Repository<Book>;
  private clothingRepository: Repository<Clothing>;

  constructor() {
    this.productRepository = AppData.getRepository(Product);
    this.bookRepository = AppData.getRepository(Book);
    this.clothingRepository = AppData.getRepository(Clothing);
  }

  async createProduct(
    productData: CreateProductDto,
    imageFiles?: Express.Multer.File[],
  ): Promise<Product> {
    let imageUrls: string[] = [];

    // Upload ảnh lên Cloudinary nếu có
    if (imageFiles && imageFiles.length > 0) {
      const filePaths = imageFiles.map((file) => file.path);
      try {
        imageUrls = await uploadMultipleImages(filePaths, "products");
      } catch (error) {
        imageFiles.forEach((file) => {
          if (fs.existsSync(file.path)) fs.unlinkSync(file.path); // Chỉ xóa nếu file tồn tại
        });
        throw error;
      }
      imageFiles.forEach((file) => {
        if (fs.existsSync(file.path)) fs.unlinkSync(file.path); // Chỉ xóa nếu file tồn tại
      });
    }

    // Validation
    if (!productData.product_name || !productData.product_price) {
      throw new Error("Product name and price are required");
    }

    // Tạo product theo type
    let product: Product | Book | Clothing;

    switch (productData.product_type) {
      case "book":
        if (!productData.author) {
          throw new Error("Author is required for book");
        }
        product = this.bookRepository.create({
          ...productData,
          img_url: imageUrls,
          author: productData.author,
        }); // Ép kiểu tạm thời để tránh lỗi TypeScript
        break;

      case "clothing":
        if (!productData.clothing_size) {
          throw new Error("Clothing size is required for clothing");
        }
        product = this.clothingRepository.create({
          ...productData,
          img_url: imageUrls,
          clothing_size: productData.clothing_size,
        });
        break;

      default:
        product = this.productRepository.create({
          ...productData,
          img_url: imageUrls,
        });
        break;
    }

    return await this.productRepository.save(product);
  }
}
