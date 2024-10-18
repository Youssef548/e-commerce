import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string({
      invalid_type_error: "Name must be string",
      required_error: "Name is required",
    })
    .trim(),
});

export const updateCategoryParams = z.object({
  categoryId: z.string({
    required_error: "Id is required",
  }),
});

export const updateCategorySchema = z.object({
  name: z.string({
    required_error: "name is required",
    invalid_type_error: "name must be string",
  }),
});

export const deleteCategoryParams = z.object({
  categoryId: z.string({
    required_error: "Id is required",
  }),
});

export const readCategorySchema = z.object({
  categoryId: z.string({
    required_error: "Id is required",
  }),
});
