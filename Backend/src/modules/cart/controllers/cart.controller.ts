import { CREATED, SUCCESS } from "../../../config/http";
import { catchErrors } from "../../../utils/catchErrors";
import { CartService } from "../services/cart.service";

export class CartController {
  private cart_service: CartService;

  constructor() {
    this.cart_service = new CartService();
  }

  getAllCartItemHandler = catchErrors(async (req, res) => {
    const user_id = req.userId;

    const cart_item = await this.cart_service.getAllCartItemByUserId(user_id);

    res.status(SUCCESS).json({
      success: true,
      data: cart_item,
    });
  });

  createCartHanlder = catchErrors(async (req, res) => {
    const user_id = req.userId;

    const cart = await this.cart_service.createCart(user_id);

    res.status(CREATED).json({
      success: true,
      data: cart,
    });
  });

  createCartItemHandler = catchErrors(async (req, res) => {
    const user_id = req.userId;
    const cart_item_data = req.body;

    const cart_item = await this.cart_service.createCartItem(
      user_id,
      cart_item_data,
    );

    res.status(CREATED).json({
      success: true,
      data: cart_item,
    });
  });
}
