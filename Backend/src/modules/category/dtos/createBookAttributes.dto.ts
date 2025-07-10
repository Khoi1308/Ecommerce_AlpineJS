export interface CreateBookAttributesDto {
  book_title: string;
  total_pages?: number;
  publish_date: Date;
  product_id: string;
}

export interface CreateClothingAttributesDto {
  clothing_size: string;
  clothing_colour: string;
  clothing_material?: string;
  product_id: string;
}
