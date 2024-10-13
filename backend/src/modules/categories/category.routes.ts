import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  listCategories,
  updateCategory,
} from "./category.controller";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validateMiddleware";
import {
  createCategorySchema,
  deleteCategoryParams,
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
  )
  .delete(
    authenticate,
    authorizeAdmin,
    validate(undefined, deleteCategoryParams),
    deleteCategory
  );

router.route("/categories").get(listCategories);

export default router;
