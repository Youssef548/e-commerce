// src/modules/users/user.controller.ts
import { Request, Response } from "express";
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "./user.service";
import asyncHandler from "../middlewares/asyncHandler";
import { User } from "@prisma/client";
import { ClientSideError } from "../../utils/errors/clientSideError";

export const addUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  const user = await createUser(email, password, name);

  return user;
}, 201);

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await getAllUsers();
  return users;
}, 200);

export const getCurrentUserProfile = asyncHandler(
  async (req: Request, res: Response) => {
    if (req.user?.id !== undefined) {
      const user = await getUser(req.user.id);

      if (!user) throw new ClientSideError("User not found", 404);

      return user;
    } else {
      throw new ClientSideError("Unauthorized", 401);
    }
  }
);

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  type UserId = User["id"];

  const userId: UserId = parseInt(req.params.userId, 10);
  const user = await getUser(userId);

  if (!user) throw new ClientSideError("User not found", 404);

  return user;
});

export const updateCurrentUserProfile = asyncHandler(
  async (req: Request, res: Response) => {
    if (req.user?.id === undefined)
      throw new ClientSideError("Unauthorized", 401);

    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    const updatedUser = await updateUser(req.user.id, data);
    return updatedUser;
  },
  200
);
export const deleteUserById = asyncHandler(
  async (req: Request, res: Response) => {
    type UserId = User["id"];

    const userId: UserId = parseInt(req.params.userId, 10);

    await deleteUser(userId);
    return { msg: "User deleted successfully" };
  },
  200
);
