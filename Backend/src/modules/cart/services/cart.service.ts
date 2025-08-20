import { NOT_FOUND } from "../../../config/http";
import { appAssert } from "../../../utils/appAssert";
import { InventoryRepository } from "../../product/repositories/inventory.repository";
import { UserService } from "../../user/services/user.service";
import { CreateCartItemDto } from "../dtos/createCartItem.dto";
import { Cart } from "../entities/cart.entity";
import { CartItem } from "../entities/cartItem.entity";
import { ICartItemWithProductId } from "../interfaces/cart.interface";
import { CartRepository } from "../repositories/cart.repository";
import { CartItemRepository } from "../repositories/cartItem.repository";

export class CartService {
  private cart_item_repo: CartItemRepository;
  private cart_repo: CartRepository;
  private user_service: UserService;
  private inventory_repository: InventoryRepository;

  constructor() {
    this.cart_repo = new CartRepository();
    this.user_service = new UserService();
    this.cart_item_repo = new CartItemRepository();
    this.inventory_repository = new InventoryRepository();
  }

  async getAllCartItemByUserId(
    user_id: string,
  ): Promise<ICartItemWithProductId[

  ]> {
    const user = await this.user_service.findUser(user_id);
    appAssert(user, NOT_FOUND, "User not found");

    const cartItems = await this.cart_item_repo
      .createQueryBuilder("cartItem")
      .select([
        "cartItem.cartItemId",
        "cartItem.item_quantity",
        "cartItem.unit_price",
        "cartItem.is_selected",
        "product.productId",
      ])
      .innerJoin("cartItem.cart", "cart")
      .innerJoin("cart.user", "user")
      .innerJoin("cartItem.inventory", "inventory")
      .innerJoin("inventory.product", "product")
      .where("user.userId = :userId", { userId: user_id })
      .orderBy("cartItem.createdAt", "DESC")
      .getMany();

    return cartItems.map((item) => ({
      cartItemId: item.cartItemId,
      item_quantity: item.item_quantity,
      unit_price: item.unit_price,
      is_selected: item.is_selected,
      total_price: item.unit_price * item.item_quantity,
      product_id: item.inventory?.product?.productId || "",
    }));
  }

  async createCart(user_id: string): Promise<Cart> {
    const user = await this.user_service.findUser(user_id);
    appAssert(user, NOT_FOUND, "User not found");

    const cart = await this.cart_repo.createCart(user);

    return cart;
  }

  async createCartItem(
    user_id: string,
    data: CreateCartItemDto,
  ): Promise<CartItem> {
    const user = await this.user_service.findUser(user_id);
    appAssert(user, NOT_FOUND, "User not found");

    const { cart_id, inventory_id, quantity, is_selected } = data;

    const cart = await this.cart_repo.findOne({ where: { cartId: cart_id } });
    appAssert(cart, NOT_FOUND, "Cart not found");

    const inventory = await this.inventory_repository.findOne({
      where: { inventoryId: inventory_id },
    });
    appAssert(inventory, NOT_FOUND, "Inventory not found");

    const cart_item = this.cart_item_repo.create({
      cart,
      inventory,
      unit_price: inventory.product_price * quantity,
      createdBy: user_id,
      is_selected,
    });

    return await this.cart_item_repo.save(cart_item);
  }
}
