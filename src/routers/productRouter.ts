import { Router } from "express";
import { validate } from "../middleware/validate.ts";

import {
  createProductSchema,
  updateProductSchema,
  productIdParamSchema,
} from "../schemas/productSchemas.ts";

import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.ts";

const productRouter = Router();

// GET /products
productRouter.get("/", getAllProducts);

// GET /products/:id
productRouter.get(
  "/:id",
  validate(productIdParamSchema),
  getProductById
);

// POST /products
productRouter.post(
  "/",
  validate(createProductSchema),
  createProduct
);

// PUT /products/:id
productRouter.put(
  "/:id",
  validate(updateProductSchema),
  updateProduct
);

// DELETE /products/:id
productRouter.delete(
  "/:id",
  validate(productIdParamSchema),
  deleteProduct
);

export default productRouter;
