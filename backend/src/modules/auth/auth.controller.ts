// src/modules/auth/auth.controller.ts
import { Request, Response } from "express";
import { loginService } from "./auth.service";
import asyncHandler from "../middlewares/asyncHandler";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.json({ error: "Email and password are required" });

  try {
    const user = await loginService(email, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
});
