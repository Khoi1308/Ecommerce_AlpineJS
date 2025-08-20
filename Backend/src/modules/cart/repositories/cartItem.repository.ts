import { Repository } from "typeorm";
import { AppData } from "../../../config/db";
import { CartItem } from "../entities/cartItem.entity";

export class CartItemRepository extends Repository<CartItem> {
  constructor() {
    super(CartItem, AppData.manager);
  }
}
