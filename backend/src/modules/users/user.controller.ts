// src/modules/users/user.controller.ts
import { Request, Response } from 'express';
import { getAllUsers, createUser } from './user.service';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get users' });
  }
};

export const addUser = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  try {
    const user = await createUser(email, password, name);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: (error as any).message });
  }
};
