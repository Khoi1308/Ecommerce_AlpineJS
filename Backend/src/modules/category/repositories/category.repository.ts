import { EntityManager, Repository } from "typeorm";
import { Category } from "../entities/category.entity";
import { AppData } from "../../../config/db";
import { appAssert } from "../../../utils/appAssert";
import { NOT_FOUND } from "../../../config/http";
import { BookAttribute } from "../entities/bookAttribute.entity";
import {
  CreateBookAttributesDto,
  CreateClothingAttributesDto,
} from "../dtos/createBookAttributes.dto";
import { Product } from "../../product/entities/product.entity";
import { ClothingAttribute } from "../entities/clothingAttribute.entity";

export class CategoryRepository {
  private category_repository: Repository<Category>;
  private book_repository: Repository<BookAttribute>;
  private clothing_repository: Repository<ClothingAttribute>;
  private entityManager: EntityManager;

  constructor(entityManager?: EntityManager) {
    this.entityManager = entityManager || AppData.manager;
    this.category_repository = this.entityManager.getRepository(Category);
    this.book_repository = this.entityManager.getRepository(BookAttribute);
    this.clothing_repository =
      this.entityManager.getRepository(ClothingAttribute);
  }

  withTransaction(entityManager: EntityManager): CategoryRepository {
    return new CategoryRepository(entityManager);
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.category_repository.findOne({
      where: {
        category_name: name,
      },
    });
    appAssert(category, NOT_FOUND, "Category name is not found");

    return category;
  }

  async findById(categoryId: string): Promise<Category> {
    return this.category_repository.findOneOrFail({ where: { categoryId } });
  }

  async createBookAttributes(
    data: CreateBookAttributesDto & { product: Product },
  ): Promise<BookAttribute> {
    const book = this.book_repository.create(data);

    return this.book_repository.save(book);
  }

  async createClothingAttributes(
    data: CreateClothingAttributesDto & { product: Product },
  ): Promise<ClothingAttribute> {
    const clothing = this.clothing_repository.create(data);

    return this.clothing_repository.save(clothing);
  }
}
