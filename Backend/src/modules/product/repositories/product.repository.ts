import { QueryRunner, Repository } from "typeorm";
import { Product } from "../entities/product.entity";
import { AppData } from "../../../config/db";
import { CreateProductDto } from "../dtos/create_product.dto";
import { UpdateProductDto } from "../dtos/update_product.dto";

export class ProductRepository extends Repository<Product> {
  constructor() {
    super(Product, AppData.manager);
  }

  async findAllProduct(): Promise<Product[]> {
    return await this.find({
      relations: ["stores"],
    });
  }

  async createProduct(
    productData: CreateProductDto,
    queryRunner: QueryRunner,
  ): Promise<Product> {
    const product = queryRunner.manager.create(Product, productData);

    return await queryRunner.manager.save(product);
  }

  async findProductById(productId: string): Promise<Product | null> {
    const product = await this.findOne({
      where: { productId },
    });

    return product;
  }

  async updateById(
    productId: string,
    productData: Partial<UpdateProductDto>,
  ): Promise<void> {
    await this.update(productId, productData);
  }
}
