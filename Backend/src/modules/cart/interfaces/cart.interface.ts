export interface ICartItemWithProductId {
  cartItemId: string;
  item_quantity: number;
  unit_price: number;
  is_selected: boolean;
  total_price: number;
  product_id: string;
}
