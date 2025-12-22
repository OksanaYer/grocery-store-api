import type { RequestHandler } from "express";
import User from "../models/User.ts";


export const getAllUsers: RequestHandler = async (_req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

//users/:id
 
export const getUserById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json(user);
};

/**
 * POST /users
 */
export const createUser: RequestHandler = async (req, res) => {
  const user = await User.create(req.body);

  res.status(201).json({
    message: "User created successfully",
    user,
  });
};

/**
 * PUT /users/:id
 */
export const updateUser: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json({
    message: "User updated successfully",
    user,
  });
};

/**
 * DELETE /users/:id
 */
export const deleteUser: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json({
    message: "User deleted successfully",
  });
};
