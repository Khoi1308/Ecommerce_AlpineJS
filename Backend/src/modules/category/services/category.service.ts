import { NOT_FOUND } from "../../../config/http";
import { appAssert } from "../../../utils/appAssert";
import { ProductRepository } from "../../product/repositories/product.repository";
import {
  CreateBookAttributesDto,
  CreateClothingAttributesDto,
} from "../dtos/createBookAttributes.dto";
import { CreateCategoryDto } from "../dtos/createCategory.dto";
import { BookAttribute } from "../entities/bookAttribute.entity";
import { Category } from "../entities/category.entity";
import { ClothingAttribute } from "../entities/clothingAttribute.entity";
import { CategoryRepository } from "../repositories/category.repository";

export class CategoryService {
  private category_repository: CategoryRepository;
  private product_repository: ProductRepository;

  constructor() {
    this.category_repository = new CategoryRepository();
    this.product_repository = new ProductRepository();
  }

  async findAll(): Promise<Category[]> {
    return await this.category_repository.findAll();
  }

  async createCategory(data: CreateCategoryDto): Promise<Category> {
    return await this.category_repository.createCategory(data);
  }

  // async createBookProduct(
  //   create_data: CreateBookAttributesDto,
  // ): Promise<BookAttribute> {
  //   const product = await this.product_repository.findProductById(
  //     create_data.product_id,
  //   );
  //   appAssert(product, NOT_FOUND, "not found product");
  //
  //   const book_product = await this.category_repository.createBookAttributes({
  //     ...create_data,
  //     product,
  //   });
  //
  //   return book_product;
  // }
  //
  // async createClothingProduct(
  //   create_data: CreateClothingAttributesDto,
  // ): Promise<ClothingAttribute> {
  //   const product = await this.product_repository.findProductById(
  //     create_data.product_id,
  //   );
  //   appAssert(product, NOT_FOUND, "not found product");
  //
  //   const clothing_product =
  //     await this.category_repository.createClothingAttributes({
  //       ...create_data,
  //       product,
  //     });
  //
  //   return clothing_product;
  // }
}
