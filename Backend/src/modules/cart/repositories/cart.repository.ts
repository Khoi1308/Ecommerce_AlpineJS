import { Repository } from "typeorm";
import { Cart } from "../entities/cart.entity";
import { AppData } from "../../../config/db";
import { User } from "../../user/entities/user.entity";

export class CartRepository extends Repository<Cart> {
  constructor() {
    super(Cart, AppData.manager);
  }

  async createCart(user: User): Promise<Cart> {
    const cart = this.create({ user });
    const created_cart = await this.save(cart);

    return created_cart;
  }
}
