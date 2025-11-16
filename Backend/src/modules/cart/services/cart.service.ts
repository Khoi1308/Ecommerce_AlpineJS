import { DataSource } from "typeorm";
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
import { IdempotencyService } from "../../idempotency/idempotency.service";
import { Inventory } from "../../product/entities/inventory.entity";
import { UpdateCartItemDto } from "../dtos/updateCartItem.dto";

export class CartService {
  private dataSource: DataSource;
  private user_service: UserService;
  private idempotentcy_service: IdempotencyService;
  private cart_item_repo: CartItemRepository;
  private cart_repo: CartRepository;
  private inventory_repository: InventoryRepository;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
    this.cart_repo = new CartRepository();
    this.user_service = new UserService();
    this.idempotentcy_service = new IdempotencyService();
    this.cart_item_repo = new CartItemRepository();
    this.inventory_repository = new InventoryRepository();
  }

  async getAllCartItemByUserId(
    user_id: string,
  ): Promise<ICartItemWithProductId[]> {
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

  async createCart(
    user_id: string,
    inventory_id: string,
    quantity: number,
    // idempotentcy_key: string,
  ): Promise<Cart> {
    const user = await this.user_service.findUser(user_id);
    appAssert(user, NOT_FOUND, "User not found");

    // Create TRANSACTION
    const query_runner = this.dataSource.createQueryRunner();
    await query_runner.connect();
    await query_runner.startTransaction();

    try {
      // 1. Check idempotency (if exist, no create - rollback)
      // const exist_record =
      //   await this.idempotentcy_service.checkIdempotency(idempotentcy_key);
      // if (exist_record) {
      //   await query_runner.rollbackTransaction();
      //   appAssert(
      //     !exist_record,
      //     TOO_MANY_REQUESTS,
      //     "Request already processed",
      //   );
      // }
      // 2. chcck exist inventory
      const inventory = await query_runner.manager
        .createQueryBuilder(Inventory, "inventory")
        .innerJoinAndSelect("inventory.product", "product")
        .where("inventory.inventoryId = :inventory_id", { inventory_id })
        .getOne();
      appAssert(inventory, NOT_FOUND, "Inventory not found");

      // 3. Add Cart
      const new_cart_id = await query_runner.manager
        .createQueryBuilder()
        .insert()
        .into(Cart)
        .values({
          user: { userId: user_id },
        })
        .execute();

      // 4. Add cartItem
      const new_cart_item = await query_runner.manager
        .createQueryBuilder()
        .insert()
        .into(CartItem)
        .values({
          cart: new_cart_id.raw[0],
          inventory: { inventoryId: inventory_id },
          item_quantity: quantity,
          unit_price: quantity * inventory.product_price,
          is_selected: true,
          createdBy: user_id,
        })
        .execute();

      // 5. Save transaction
      await query_runner.commitTransaction();

      return new_cart_item.raw[0];
    } catch (error) {
      // If error => Rollback
      await query_runner.rollbackTransaction();
      throw error;
    } finally {
      await query_runner.release();
    }
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

  async updateCartItem(
    user_id: string,
    cart_id: string,
    inventory_Data: UpdateCartItemDto,
  ) {
    let change_flag = false;
    const user = await this.user_service.findUser(user_id);
    appAssert(user, NOT_FOUND, "User not found");

    const cart_item = await this.cart_item_repo.findOne({
      where: { cartItemId: cart_id },
      relations: ["cart", "inventory"],
    });
    appAssert(cart_item, NOT_FOUND, "Cart item not found");

    console.log("Price: ", cart_item.inventory.product_price);

    if (inventory_Data.quantity !== undefined) {
      cart_item.item_quantity = inventory_Data.quantity;
      cart_item.unit_price =
        inventory_Data.quantity * cart_item.inventory.product_price;
      change_flag = true;
    }

    if (inventory_Data.is_selected !== undefined) {
      cart_item.is_selected = inventory_Data.is_selected;
      change_flag = true;
    }

    if (change_flag) {
      await this.cart_item_repo.save(cart_item);
    }

    return cart_item;
  }
}
