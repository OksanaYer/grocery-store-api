import type { RequestHandler } from "express";
import Category from "../models/Category.ts";

/**
 * GET /categories
 */
export const getAllCategories: RequestHandler = async (_req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
};

/**
 * GET /categories/:id
 */
export const getCategoryById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) {
    return res.status(404).json({
      message: "Category not found",
    });
  }

  res.status(200).json(category);
};

/**
 * POST /categories
 */
export const createCategory: RequestHandler = async (req, res) => {
  const category = await Category.create(req.body);

  res.status(201).json({
    message: "Category created successfully",
    category,
  });
};

/**
 * PUT /categories/:id
 */
export const updateCategory: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!category) {
    return res.status(404).json({
      message: "Category not found",
    });
  }

  res.status(200).json({
    message: "Category updated successfully",
    category,
  });
};

/**
 * DELETE /categories/:id
 */
export const deleteCategory: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    return res.status(404).json({
      message: "Category not found",
    });
  }

  res.status(200).json({
    message: "Category deleted successfully",
  });
};
