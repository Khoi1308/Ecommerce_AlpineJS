export interface CreateProductDto {
  product_name: string;
  product_price: number;
  description?: string;
  product_discount?: number;
  stock_quantity?: number;
  is_active?: boolean;
  img_url?: string[] | string;
  product_type: "product" | "book" | "clothing";
  // For Book
  author?: string;
  // For Clothing
  clothing_size?: string;
  createdAt: string;
  updatesAt: string;
}
