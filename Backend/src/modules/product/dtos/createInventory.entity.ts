export interface CreateInventoryDto {
  quantity_on_stock: number;
  sku: string;
  createdAt: Date;
  createdBy: string;
}
