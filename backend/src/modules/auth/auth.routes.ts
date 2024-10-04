// src/modules/auth/auth.routes.ts
import { Router } from "express";
import { login } from "./auth.controller";
import { validate } from "../middlewares/validateMiddleware";
import { loginSchema } from "./schemas";

const router = Router();

router.post("/login", validate(loginSchema), login);

export default router;
