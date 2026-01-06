import { z } from "zod";

//param
export const userIdParamSchema = z.object({
  params: z.object({
    id: z.string().length(24, "Invalid user id"),
  }),
});


export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
  }),
});


export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
  }),
  params: z.object({
    id: z.string().length(24),
  }),
});
