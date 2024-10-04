import { z } from "zod";

// update user schema
export const userSchema = z.object({
  name: z.string({
    invalid_type_error: "Name must be string",
    required_error: "Name is required",
  }),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email format"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .optional(),
});

export const createUserShcema = z.object({
  name: z.string({
    invalid_type_error: "Name must be string",
    required_error: "Name is required",
  }),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email format"),
  password: z
    .string({ required_error: "password is required" })
    .min(6, "Password must be at least 6 characters long"),
});
export const deleteUserSchema = z.object({
  userId: z.number({ required_error: "UserId is required" }),
});
