import type { RequestHandler } from "express";
import Order from "../models/Order.ts";
import User from "../models/User.ts";
import Product from "../models/Product.ts";

// This enforces FR018: compute on server, not trusting client.
 
const recalcTotal = async (orderId: string) => {
  const order = await Order.findById(orderId);
  if (!order) return null;

  let total = 0;

  for (const item of order.products) {
    const product = await Product.findById(item.productId).select("price");
    if (!product) {
      // If product disappeared, ignore it in total calc (or you can throw).
      continue;
    }
    total += product.price * item.quantity;
  }

  order.total = total;
  await order.save();
  return order;
};

// POST /orders/cart
export const createCart: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.body;

    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    // Optional: one active draft cart per user
    const existingDraft = await Order.findOne({ userId, status: "draft" });
    if (existingDraft) {
      return res.status(200).json(existingDraft);
    }

    const cart = await Order.create({
      userId,
      products: [],
      total: 0,
      status: "draft",
    });

    res.status(201).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating cart" });
  }
};

// POST /orders/cart/items
export const addItemToCart: RequestHandler = async (req, res) => {
  try {
    const { cartId, productId, quantity } = req.body;

    const cart = await Order.findById(cartId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    if (cart.status !== "draft") {
      return res.status(400).json({ message: "Order is not editable" });
    }

    const productExists = await Product.exists({ _id: productId });
    if (!productExists) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingItem = cart.products.find(
      (p) => String(p.productId) === String(productId)
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    const updated = await recalcTotal(String(cart._id));

    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding item to cart" });
  }
};

// DELETE /orders/cart/:cartId/items/:productId
export const removeItemFromCart: RequestHandler = async (req, res) => {
  try {
    const { cartId, productId } = req.params;

    const cart = await Order.findById(cartId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    if (cart.status !== "draft") {
      return res.status(400).json({ message: "Order is not editable" });
    }

    cart.products = cart.products.filter(
      (p) => String(p.productId) !== String(productId)
    );

    await cart.save();
    const updated = await recalcTotal(String(cart._id));

    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing item from cart" });
  }
};

// POST /orders/checkout
export const checkoutCart: RequestHandler = async (req, res) => {
  try {
    const { cartId } = req.body;

    const cart = await Order.findById(cartId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    if (cart.status !== "draft") {
      return res.status(400).json({ message: "Cart already checked out" });
    }

    // Ensure all products still exist
    for (const item of cart.products) {
      const exists = await Product.exists({ _id: item.productId });
      if (!exists) {
        return res.status(400).json({
          message: "Order contains a product that no longer exists",
          productId: item.productId,
        });
      }
    }

    await recalcTotal(String(cart._id));
    cart.status = "placed";
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error checking out cart" });
  }
};
