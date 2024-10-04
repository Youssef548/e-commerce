import { z } from "zod";

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
