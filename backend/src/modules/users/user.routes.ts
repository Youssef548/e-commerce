// src/modules/users/user.routes.ts
import { Router } from "express";
import {
  getUsers,
  addUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
} from "./user.controller";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validateMiddleware";
import { createUserSchema, deleteUserSchema, userSchema } from "./schema";

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @openapi
 * /api/users:
 *   post:
 *     tags: [Users]
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 example: 54871900aA
 *               name:
 *                 type: string
 *                 example: Test User
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @openapi
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Fetch all users
 *     responses:
 *       200:
 *         description: A list of users
 *       401:
 *         description: Unauthorized
 */

/**
 * @openapi
 * /api/users/profile:
 *   get:
 *     tags: [Users]
 *     summary: Get the current user profile
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @openapi
 * /api/users/profile:
 *   put:
 *     tags: [Users]
 *     summary: Update the current user profile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: newemail@example.com
 *               name:
 *                 type: string
 *                 example: Updated User
 *               password:
 *                 type: string
 *                 example: newPassword1A
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @openapi
 * /api/users/{userId}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

router
  .post("/", validate(createUserSchema), addUser) // Corrected 'createUserShcema' to 'createUserSchema'
  .get("/", authenticate, authorizeAdmin, getUsers);

router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, validate(userSchema), updateCurrentUserProfile);

router.delete(
  "/:userId",
  authenticate,
  authorizeAdmin,
  validate(undefined, deleteUserSchema),
  deleteUserById
);

export default router;
