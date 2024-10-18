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
/**
 * @openapi
 * /api/category:
 *   get:
 *     tags: [category]
 *     summary: List all category
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *
 *   post:
 *     tags: [category]
 *     summary: Create a new category
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the category
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

/**
 * @openapi
 * /api/category/{categoryId}:
 *   put:
 *     tags: [category]
 *     summary: Update a category by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the category
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 *
 *   delete:
 *     tags: [category]
 *     summary: Delete a category by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category to delete
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 */

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
