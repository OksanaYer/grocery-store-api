import { z } from "zod";

// Mongo ObjectId (24 hex chars)
export const objectIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid id"),
});

export const createCartSchema = z.object({
  body: z.object({
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid userId"),
  }),
});

export const addItemToCartSchema = z.object({
  body: z.object({
    cartId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid cartId"),
    productId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid productId"),
    quantity: z.number().int().min(1),
  }),
});

export const removeItemFromCartSchema = z.object({
  params: z.object({
    cartId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid cartId"),
    productId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid productId"),
  }),
});

export const checkoutCartSchema = z.object({
  body: z.object({
    cartId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid cartId"),
  }),
});
