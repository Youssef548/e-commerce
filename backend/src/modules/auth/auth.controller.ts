// src/modules/auth/auth.controller.ts
import { Request, Response } from "express";
import { loginService } from "./auth.service";
import asyncHandler from "../middlewares/asyncHandler";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await loginService(email, password);

  return user;
});
