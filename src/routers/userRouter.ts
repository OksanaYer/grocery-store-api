import { Router } from "express";

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.ts";

import { validate } from "../middleware/validate.ts";
import {
  createUserSchema,
  updateUserSchema,
  userIdParamSchema,
} from "../schemas/userSch.ts";

const userRouter = Router();

// GET users 
userRouter.get("/", getAllUsers);

userRouter.get(
  "/:id",
  validate(userIdParamSchema),
  getUserById
);

// POST users 
userRouter.post(
  "/",
  validate(createUserSchema),
  createUser
);

// PUT user обновить 
userRouter.put(
  "/:id",
  validate(updateUserSchema),
  updateUser
);

// DELETE 
userRouter.delete(
  "/:id",
  validate(userIdParamSchema),
  deleteUser
);

export default userRouter;
