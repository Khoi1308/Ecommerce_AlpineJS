export interface IProduct {
  product_name: string;
  product_price: number;
  images: string[];
  description: string;
  quantity_on_stock: number;
  // Book
  book_author: string;
  book_title: string;
  total_pages: number;
  publish_date: Date;
  // Clothing
  clothing_size: string;
  clothing_color: string;
  clothing_material: string;
}
