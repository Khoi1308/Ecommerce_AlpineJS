import { DeepPartial, Repository } from "typeorm";
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

  async createProduct(productData: CreateProductDto): Promise<Product> {
    const product = this.create(productData as DeepPartial<Product>);

    return await this.save(product);
  }

  async findById(productId: string): Promise<Product | null> {
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
