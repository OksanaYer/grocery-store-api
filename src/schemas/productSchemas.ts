import { z } from "zod";


export const objectIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
});

//create
export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().min(0, "Price must be >= 0"),
    category: z.string().min(1, "Category is required"),
  }),
});

//update
export const updateProductSchema = z.object({
  params: objectIdSchema,
  body: z.object({
    name: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    price: z.number().min(0).optional(),
    category: z.string().min(1).optional(),
  }),
});

//delete
export const deleteProductSchema = z.object({
  params: objectIdSchema,
});

//by id
export const getProductByIdSchema = z.object({
  params: objectIdSchema,
});


export const searchProductsSchema = z.object({
  query: z.object({
    name: z.string().optional(),
    category: z.string().optional(),
  }),
});
export const productIdParamSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

