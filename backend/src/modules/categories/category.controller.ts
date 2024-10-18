import { Request } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import {
  createCategoryService,
  deleteCategoryService,
  listCategoriesService,
  updateCategoryService,
  getCategoryService
} from "./category.service";

export const createCategory = asyncHandler(async (req: Request) => {
  const { name } = req.body;

  const category = await createCategoryService(name);
  return category;
}, 201);

export const readCategory = asyncHandler(async (req: Request) => {
  const { categoryId } = req.params;

  const category = await getCategoryService(categoryId);
  return category;
}, 200);

export const updateCategory = asyncHandler(async (req: Request) => {
  const { categoryId } = req.params;
  const { name } = req.body;
  const data = { name } as { name: string };

  const category = await updateCategoryService(categoryId, data);

  return category;
}, 200);

export const deleteCategory = asyncHandler(async (req: Request) => {
  const { categoryId } = req.params;

  const category = await deleteCategoryService(categoryId);

  return category;
}, 200);

export const listCategories = asyncHandler(async () => {
  const categories = await listCategoriesService();

  return categories;
});
