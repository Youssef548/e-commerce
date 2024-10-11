import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import { createCategoryService } from "./category.service";

export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.body;

    const category = await createCategoryService(name);
    return category;
  },
  201
);


