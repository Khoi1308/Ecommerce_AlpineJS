export interface ICartItemWithProductId {
  cartItemId: string;
  item_quantity: number;
  unit_price: number;
  is_selected: boolean;
  total_price: number;
  product_id: string;
}

export interface ICart {
  success: boolean;
  cart_item: {
    cart_item_id: string;
    quantity: number;
    unit_price: string;
    is_selected: boolean
  }
}
