import { Router } from "express";
import { createCategory } from "./category.controller";
import { authenticate } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validateMiddleware";
import { createCategorySchema } from "./schemas/categorySchema";
const router = Router();

router
  .route("/")
  .post(
    authenticate,
    validate(createCategorySchema, undefined),
    createCategory
  );

export default router;
