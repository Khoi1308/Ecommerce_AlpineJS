import { NOT_FOUND } from "../../../config/http";
import { appAssert } from "../../../utils/appAssert";
import {
  deleteMultipleImages,
  uploadMultipleImages,
} from "../../../utils/uploadImage";
import { CreateProductDto } from "../dtos/create_product.dto";
import { UpdateProductDto } from "../dtos/update_product.dto";
import { Product } from "../entities/product.entity";
import { ProductRepository } from "../repositories/product.repository";
import fs from "fs";

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getProductById(productId: string): Promise<Product> {
    const product = await this.productRepository.findById(productId);
    appAssert(product, NOT_FOUND, "Not found product");

    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.findAllProduct();
  }

  async createProduct(
    productData: CreateProductDto,
    imageFiles?: Express.Multer.File[],
  ): Promise<Product> {
    let image_urls: string[] = [];

    if (imageFiles && imageFiles.length > 0) {
      try {
        const filePaths = imageFiles.map((file) => file.path);
        image_urls = await uploadMultipleImages(filePaths);
      } catch (error) {
        imageFiles.forEach((file) => fs.unlinkSync(file.path));
        throw new Error(`Failed to upload images: ${error}`);
      }
      imageFiles.forEach((file) => fs.unlinkSync(file.path));
    }

    const productWithImage: CreateProductDto = {
      ...productData,
      img_url: image_urls,
    };

    let product: Product;
    switch (productData.product_type) {
      case "book":
        appAssert(productData.author, NOT_FOUND, "Author is required for book");
        product = await this.productRepository.createBook({
          ...productWithImage,
          author: productData.author,
        });
        break;
      case "clothing":
        appAssert(
          productData.clothing_size,
          NOT_FOUND,
          "Clothing size is required for clothing",
        );
        product = await this.productRepository.createClothing({
          ...productWithImage,
          clothing_size: productData.clothing_size,
        });
        break;
      default:
        product = await this.productRepository.createProduct(productWithImage);
        break;
    }

    return product;
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

      await this.productRepository.updateById(productId, updatedData);
    }

    // Get updated product
    const updatedProduct = await this.productRepository.findById(productId);
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
    const product = await this.productRepository.findById(productId);
    appAssert(product, NOT_FOUND, "Product not found");

    // Delete images in Product
    if (img_url && img_url.length > 0) {
      await deleteMultipleImages(img_url);

      const updated_product: Partial<UpdateProductDto> = {
        img_url: product.img_url.filter((url) => !img_url.includes(url)),
      };
      await this.productRepository.updateById(
        product.productId,
        updated_product,
      );
    }
  }

  async addImagesInProduct(
    productId: string,
    img_urls: Express.Multer.File[],
  ): Promise<void> {
    const product = await this.productRepository.findById(productId);
    appAssert(product, NOT_FOUND, "Product not found");

    let new_image_urls: string[] | [];
    if (img_urls && img_urls.length > 0) {
      const file_paths = img_urls.map((file) => file.path);
      try {
        new_image_urls = await uploadMultipleImages(file_paths);
        const updated_urls = [...product.img_url, ...new_image_urls];

        // Update urls in database
        const updated_data: Partial<UpdateProductDto> = {
          img_url: updated_urls,
        };
        await this.productRepository.updateById(productId, updated_data);
      } catch (error) {
        throw new Error(`Failed to add images: ${error}`);
      }
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
