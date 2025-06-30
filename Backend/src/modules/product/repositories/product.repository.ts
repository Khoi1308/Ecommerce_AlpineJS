import { DeepPartial, Repository } from "typeorm";
import { Book, Clothing, Product } from "../entities/product.entity";
import { AppData } from "../../../config/db";
import { CreateProductDto } from "../dtos/create_product.dto";
import { UpdateProductDto } from "../dtos/update_product.dto";
import { deleteMultipleImages } from "../../../utils/uploadImage";

export class ProductRepository {
  private productRepository: Repository<Product>;
  private bookRepository: Repository<Book>;
  private clothingRepository: Repository<Clothing>;

  constructor() {
    this.productRepository = AppData.getRepository(Product);
    this.bookRepository = AppData.getRepository(Book);
    this.clothingRepository = AppData.getRepository(Clothing);
  }

  async findAllProduct(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: ["stores"],
    });
  }

  async createProduct(productData: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(
      productData as DeepPartial<Product>,
    );

    return await this.productRepository.save(product);
  }

  async createBook(
    bookData: CreateProductDto & { author: string },
  ): Promise<Book> {
    const book = this.bookRepository.create(bookData as DeepPartial<Book>);

    return await this.bookRepository.save(book);
  }

  async createClothing(
    clothingData: CreateProductDto & { clothing_size: string },
  ): Promise<Clothing> {
    const clothing = this.clothingRepository.create(
      clothingData as DeepPartial<Clothing>,
    );

    return await this.clothingRepository.save(clothing);
  }

  async findById(productId: string): Promise<Product | null> {
    const product = await this.productRepository.findOne({
      where: { productId },
      relations: ["stores"],
    });

    return product;
  }

  async updateById(
    productId: string,
    productData: Partial<UpdateProductDto>,
  ): Promise<void> {
    await this.productRepository.update(productId, productData);
  }
}
