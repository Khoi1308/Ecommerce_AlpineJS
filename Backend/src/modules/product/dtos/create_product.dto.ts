import {
  CreateBookAttributesDto,
  CreateClothingAttributesDto,
} from "../../category/dtos/createBookAttributes.dto";
import { CreateInventoryDto } from "./createInventory.entity";

export interface CreateProductDto {
  product_name: string;
  product_price: number;
  description?: string;
  img_url?: string[];
  is_active?: boolean;
  category_id: string;
  book_attributes?: CreateBookAttributesDto;
  clothing_attributes?: CreateClothingAttributesDto;
  inventory: CreateInventoryDto;
}
