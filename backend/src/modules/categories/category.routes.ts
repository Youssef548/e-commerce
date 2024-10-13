import { Router } from "express";
import { createCategory, updateCategory } from "./category.controller";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validateMiddleware";
import {
  createCategorySchema,
  updateCategoryParams,
  updateCategorySchema,
} from "./schemas/categorySchema";
const router = Router();

router
  .route("/")
  .post(
    authenticate,
    authorizeAdmin,
    validate(createCategorySchema, undefined),
    createCategory,
    updateCategory
  );

router
  .route("/:categoryId")
  .put(
    authenticate,
    authorizeAdmin,
    validate(updateCategorySchema, updateCategoryParams),
    updateCategory
  );

export default router;
