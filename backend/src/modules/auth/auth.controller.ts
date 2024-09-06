// src/modules/auth/auth.controller.ts
import { Request, Response } from 'express';
import { loginService } from './auth.service';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await loginService(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }  
};
