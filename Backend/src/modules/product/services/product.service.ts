import { DataSource } from "typeorm";
import { NOT_FOUND } from "../../../config/http";
import { appAssert } from "../../../utils/appAssert";
import {
  deleteMultipleImages,
  uploadMultipleImages,
} from "../../../utils/uploadImage";
import { CategoryRepository } from "../../category/repositories/category.repository";
import { CreateProductDto } from "../dtos/create_product.dto";
import { UpdateProductDto } from "../dtos/update_product.dto";
import { Product } from "../entities/product.entity";
import { InventoryRepository } from "../repositories/inventory.repository";
import { ProductRepository } from "../repositories/product.repository";
import fs from "fs";

export class ProductService {
  private product_repository: ProductRepository;
  private category_repository: CategoryRepository;
  private inventory_repository: InventoryRepository;
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
    this.product_repository = new ProductRepository();
    this.category_repository = new CategoryRepository();
    this.inventory_repository = new InventoryRepository();
  }

  async getProductById(productId: string): Promise<Product> {
    const product = await this.product_repository.findProductById(productId);
    appAssert(product, NOT_FOUND, "Not found product");

    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.product_repository.findAllProduct();
  }

  async createProduct(
    user_id: string,
    product_data: CreateProductDto,
  ): Promise<Product> {
    const { category_id } = product_data;

    const category = await this.category_repository.findById(category_id);
    appAssert(category, NOT_FOUND, "Category is not found");

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Create product
      const saved_product = await this.product_repository.createProduct(
        product_data,
        queryRunner,
      );

      // Create category repository with transaction
      const category_transaction_repo =
        this.category_repository.withTransaction(queryRunner.manager);

      let product_sku = "";
      console.log("Category: ", category);

      // Create attribute
      switch (category.category_name) {
        case "Book": {
          appAssert(
            product_data.book_attributes,
            NOT_FOUND,
            "Book's attribute must be required",
          );

          const book = await category_transaction_repo.createBookAttributes(
            {
              ...product_data.book_attributes,
              product: saved_product,
            },
            queryRunner,
          );

          product_sku = `${book.product.product_name}-${book.book_title}-${book.publish_date}`;
          break;
        }

        case "Clothing": {
          appAssert(
            product_data.clothing_attributes,
            NOT_FOUND,
            "Clothing's attribute must be required",
          );

          const clothing =
            await category_transaction_repo.createClothingAttributes(
              {
                ...product_data.clothing_attributes,
                product: saved_product,
              },
              queryRunner,
            );
          product_sku = `${clothing.product.product_name}-${clothing.clothing_size}-${clothing.clothing_color}-${clothing.clothing_material}`;
          break;
        }

        default:
          appAssert(
            product_data.book_attributes || product_data.clothing_attributes,
            NOT_FOUND,
            "Attribute must be required",
          );
          break;
      }

      // Create inventory
      if (product_data.inventory.quantity_on_stock !== undefined) {
        await this.inventory_repository.createInventory(
          {
            product: saved_product,
            ...product_data.inventory,
            product_price: product_data.product_price,
            createdBy: user_id,
            sku: product_sku,
          },
          queryRunner,
        );
      }

      await queryRunner.commitTransaction();

      return saved_product;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(`Error: ${error}`);
    } finally {
      await queryRunner.release();
    }
  }

  async updateProduct(
    productId: string,
    updateParams: UpdateProductDto,
  ): Promise<{ product: Product; hasChange: boolean }> {
    // Get current product
    const cur_product = await this.getProductById(productId);

    const { addImages, removeImages, ...productUpdateData } = updateParams;

    // Check product's data has change
    const hasDataChange = this.checkProductChanges(
      cur_product,
      productUpdateData,
    );

    let new_image_urls = [...(cur_product.img_url || [])];
    let hasImageChange = false;

    // Remove images
    if (removeImages && removeImages.length > 0) {
      hasImageChange = true;
      await deleteMultipleImages(removeImages);

      // Delete images has remove's list
      new_image_urls = new_image_urls.filter(
        (url) => !removeImages.includes(url),
      );
    }

    // Add new images
    if (addImages && addImages.length > 0) {
      hasImageChange = true;
      try {
        const filePaths = addImages.map((file) => file.path);
        const uploadedUrls = await uploadMultipleImages(filePaths);

        new_image_urls.push(...uploadedUrls);
      } catch (error) {
        addImages.forEach((file) => fs.unlinkSync(file.path));
        throw new Error(`Failed to upload new image: ${error}`);
      }
    }

    const hasChange = hasDataChange || hasImageChange;

    if (hasChange) {
      const updatedData: Partial<UpdateProductDto> = {
        ...productUpdateData,
        img_url: new_image_urls,
        updatesAt: new Date().toString(),
      };

      await this.product_repository.updateById(productId, updatedData);
    }

    // Get updated product
    const updatedProduct =
      await this.product_repository.findProductById(productId);
    appAssert(updatedProduct, NOT_FOUND, "Not found product");

    return {
      product: updatedProduct,
      hasChange,
    };
  }

  async deleteImagesInProduct(
    productId: string,
    img_url: string[],
  ): Promise<void> {
    const product = await this.product_repository.findProductById(productId);
    appAssert(product, NOT_FOUND, "Product not found");

    // Delete images in Product
    if (img_url && img_url.length > 0) {
      await deleteMultipleImages(img_url);

      const updated_product: Partial<UpdateProductDto> = {
        img_url: product.img_url.filter((url) => !img_url.includes(url)),
      };
      await this.product_repository.updateById(
        product.productId,
        updated_product,
      );
    }
  }

  async addImages(img_urls: Express.Multer.File[]): Promise<string[]> {
    if (img_urls && img_urls.length > 0) {
      const file_paths = img_urls.map((file) => file.path);
      try {
        const new_image_urls = await uploadMultipleImages(file_paths);

        return new_image_urls;
      } catch (error) {
        throw new Error(`Failed to add images: ${error}`);
      }
    } else {
      return [];
    }
  }

  private checkProductChanges(
    currentProduct: Product,
    updateData: Partial<UpdateProductDto>,
  ): boolean {
    const updatedField = Object.keys(updateData).filter(
      (field) => field !== "images" && field !== "removeImages",
    );

    return updatedField.some((field) => {
      const updateValue = updateData[field as keyof UpdateProductDto];
      console.log("Update value: ", updateValue);

      const curValue = currentProduct[field as keyof Product];
      console.log("Current value: ", curValue);

      if (updateValue === undefined) {
        return false;
      }

      return String(updateValue) !== String(curValue);
    });
  }
}
