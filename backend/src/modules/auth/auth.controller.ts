// src/modules/auth/auth.controller.ts
import { Request, Response } from "express";
import { loginService } from "./auth.service";
import asyncHandler from "../middlewares/asyncHandler";
import { ClientSideError } from "../../utils/errors/clientSideError";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new ClientSideError("Email and password are required", 400);

  const user = await loginService(email, password);

  return user;
});
