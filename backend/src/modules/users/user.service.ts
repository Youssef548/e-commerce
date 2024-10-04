// src/modules/users/user.service.ts
import prisma from "../../prisma/prisma";
import { User } from "@prisma/client";
import generateAuthToken from "../../utils/createToken";
import { UserSafety } from "../../types/UserSafety";
import { ClientSideError } from "../../utils/errors/clientSideError";
import hashPassword from "../../utils/hashFunction";

type UserId = User["id"];

export const getUser = async (userId: UserId) => {
  const userWithPassword = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!userWithPassword) throw new ClientSideError("User not found", 404);

  const { password, ...user } = userWithPassword;

  return user;
};

export const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  if (!users || users.length === 0)
    throw new ClientSideError("Users not found", 404);
  return users;
};

export const createUser = async (
  email: string,
  inputPassword: string,
  name?: string
): Promise<UserSafety> => {
  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) throw new ClientSideError("User already exists", 400);
  const hashedPassword = await hashPassword(inputPassword);

  const userWithPassword = await prisma.user.create({
    data: { email, password: hashedPassword, name },
  });
  const { password, ...user } = userWithPassword;

  generateAuthToken(user);

  return user;
};

export const updateUser = async (userId: UserId, data: Partial<User>) => {
  if (!userId || !data)
    throw new ClientSideError("User id and data are required", 400);

  const userExists = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (userExists && userExists.email !== data.email) {
    const emailExists = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (emailExists) throw new ClientSideError("Email already exists", 400);
  }

  if (!userExists) throw new ClientSideError("User not found", 400);

  if (data.password) {
    data.password = await hashPassword(data.password);
  }

  const userWithPassword = await prisma.user.update({
    where: {
      id: userId,
    },
    data,
  });

  const { password, ...user } = userWithPassword;

  return user;
};

export const deleteUser = async (userId: UserId) => {
  
  const userExists = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!userExists) throw new ClientSideError("User not found", 404);

  await prisma.user.delete({
    where: {
      id: userId,
    },
  });
};
