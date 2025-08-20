export interface CreateInventoryDto {
  quantity_on_stock: number;
  sku: string;
  product_price: number;
  createdAt: Date;
  createdBy: string;
}
