import { Router } from "express";
import { createCategory } from "./category.controller";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validateMiddleware";
import { createCategorySchema } from "./schemas/categorySchema";
const router = Router();

router
  .route("/")
  .post(
    authenticate,
    authorizeAdmin,
    validate(createCategorySchema, undefined),
    createCategory
  );

export default router;
