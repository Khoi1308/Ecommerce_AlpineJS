export interface CreateCartItemDto {
  cart_id: string;
  inventory_id: string;
  quantity: number;
  unit_price?: number;
  is_selected?: boolean;
  createdBy: string;
}
