export interface UpdateProductDto {
  product_name?: string;
  product_price?: number;
  description?: string;
  product_discount?: number;
  stock_quantity?: number;
  is_active?: boolean;
  product_type?: "product" | "book" | "clothing";
  img_url: string[];
  // For Book
  author?: string;
  // For Clothing
  clothing_size?: string;
  updatesAt?: string;
  // Images management
  addImages?: Express.Multer.File[];
  removeImages?: string[];
}
