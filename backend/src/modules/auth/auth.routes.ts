// src/modules/auth/auth.routes.ts
import { Router } from "express";
import { login } from "./auth.controller";
import { validate } from "../middlewares/validateMiddleware";
import { loginSchema } from "./schemas";

const router = Router();
/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: Log in a user and return a token
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
 *     responses:
 *       200:
 *         description: User logged in successfully and token returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Bad request (invalid email or password)
 *       401:
 *         description: Unauthorized (incorrect credentials)
 */

router.post("/login", validate(loginSchema), login);

export default router;
