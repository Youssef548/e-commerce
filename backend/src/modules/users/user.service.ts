// src/modules/users/user.service.ts
import prisma from '../../prisma/prisma';
import { User } from '@prisma/client';

export const getAllUsers = async (): Promise<User[]> => {
  return await prisma.user.findMany();
};

export const createUser = async (email: string, password: string, name?: string): Promise<User> => {
  return await prisma.user.create({
    data: { email, password, name },
  });
};
