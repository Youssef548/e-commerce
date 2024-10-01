interface UserWithToken extends Omit<User, "password"> {
  token?: string; // or string | null if you want to allow null
}

import prisma from "../../prisma/prisma";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ClientSideError } from "../../utils/errors/clientSideError";

export const loginService = async (email: string, inputPassword: string) => {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
  });

  if (!userWithPassword) throw new ClientSideError("user not found", 400);

  const { password, ...user } = userWithPassword;

  if (!(await isPasswordValid(password, inputPassword))) {
    throw new ClientSideError("Invalid credentials", 400);
  }

  generateAuthToken(user);

  return user;
};

const isPasswordValid = async (
  password: string | null,
  inputPassword: string
) => {
  if (!password) return false;
  return bcrypt.compare(inputPassword, password);
};

const generateAuthToken = (user: UserWithToken) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  user.token = token;
};
