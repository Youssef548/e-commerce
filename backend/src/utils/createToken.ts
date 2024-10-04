import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { Response } from "express";

export interface UserWithToken extends Omit<User, "password"> {
  token?: string; // or string | null if you want to allow null
}
const generateAuthToken = (user: UserWithToken) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  user.token = token;
};

export default generateAuthToken;
