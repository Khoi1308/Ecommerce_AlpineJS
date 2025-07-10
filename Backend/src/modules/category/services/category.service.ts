import {
  CreateBookAttributesDto,
  CreateClothingAttributesDto,
} from "../dtos/createBookAttributes.dto";
import { BookAttribute } from "../entities/bookAttribute.entity";
import { ClothingAttribute } from "../entities/clothingAttribute.entity";
import { CategoryRepository } from "../repositories/category.repository";

export class CategoryService {
  private category_repository: CategoryRepository;

  constructor() {
    this.category_repository = new CategoryRepository();
  }

  async createBookProduct(
    create_data: CreateBookAttributesDto,
  ): Promise<BookAttribute> {
    const book_product = await this.category_repository.createBook({
      ...create_data,
    });

    return book_product;
  }

  // async createClothingProduct(
  //   create_data: CreateClothingAttributesDto,
  // ): Promise<ClothingAttribute> {
  //   const book_product = await this.category_repository.createBook({
  //     ...create_data,
  //   });
  //
  //   return book_product;
  // }
}
