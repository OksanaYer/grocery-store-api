import { Router } from "express";
import { validate } from "../middleware/validate.ts";

import {
  createCartSchema,
  addItemToCartSchema,
  removeItemFromCartSchema,
  checkoutCartSchema,
} from "../schemas/orderSchemas.ts";

import {
  createCart,
  addItemToCart,
  removeItemFromCart,
  checkoutCart,
} from "../controllers/orderController.ts";

const orderRouter = Router();

// POST /orders/cart
orderRouter.post("/cart", validate(createCartSchema), createCart);

// POST /orders/cart/items
orderRouter.post("/cart/items", validate(addItemToCartSchema), addItemToCart);

// DELETE /orders/cart/:cartId/items/:productId
orderRouter.delete(
  "/cart/:cartId/items/:productId",
  validate(removeItemFromCartSchema),
  removeItemFromCart
);

// POST /orders/checkout
orderRouter.post("/checkout", validate(checkoutCartSchema), checkoutCart);

export default orderRouter;
