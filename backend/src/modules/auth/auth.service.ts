import prisma from "../../prisma/prisma";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginService = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) throw new Error("User not found");

  if (!user || !(await isPasswordValid(user, password))) {
    throw new Error("Invalid credentials");
  }

  const token = generateAuthToken(user);

  return { id: user.id, eamil: user.email, name: user.name, token };
};

const isPasswordValid = async (user: User, password: string) => {
  return bcrypt.compare(password, user.password);
};

const generateAuthToken = (user: User) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};
