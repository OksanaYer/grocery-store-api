import type { RequestHandler } from "express";
import Product from "../models/Product.ts";
import Category from "../models/Category.ts";


export const createProduct: RequestHandler = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !description || price === undefined || !category) {
      return res.status(400).json({
        message: "name, description, price and category are required",
      });
    }

    
    let existingCategory = await Category.findOne({ name: category });


    if (!existingCategory) {
      existingCategory = await Category.create({ name: category });
    }

    const product = await Product.create({
      name,
      description,
      price,
      categoryId: existingCategory._id,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating product" });
  }
};

export const getAllProducts: RequestHandler = async (_req, res) => {
  try {
    const products = await Product.find().populate("categoryId");
    res.json(products);
  } catch {
    res.status(500).json({ message: "Error fetching products" });
  }
};


export const getProductById: RequestHandler = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("categoryId");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch {
    res.status(500).json({ message: "Error fetching product" });
  }
};


export const updateProduct: RequestHandler = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    let updateData: any = { name, description, price };

    if (category) {
      let existingCategory = await Category.findOne({ name: category });
      if (!existingCategory) {
        existingCategory = await Category.create({ name: category });
      }
      updateData.categoryId = existingCategory._id;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch {
    res.status(500).json({ message: "Error updating product" });
  }
};


export const deleteProduct: RequestHandler = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted" });
  } catch {
    res.status(500).json({ message: "Error deleting product" });
  }
};
