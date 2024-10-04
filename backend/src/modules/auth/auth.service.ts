import prisma from "../../prisma/prisma";
import bcrypt from "bcrypt";
import { ClientSideError } from "../../utils/errors/clientSideError";
import generateAuthToken from "../../utils/createToken";

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
