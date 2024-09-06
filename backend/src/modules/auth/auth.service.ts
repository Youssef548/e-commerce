import prisma from '../../prisma/prisma';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginService = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user || !(await isPasswordValid(user, password))) {
    throw new Error('Invalid credentials');
  }

  return generateAuthToken(user);
};

const isPasswordValid = async (user: User, password: string) => {
  return bcrypt.compare(password, user.password);
};

const generateAuthToken = (user: User) => {
  const token = jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', {
    expiresIn: '1h'
  });
  return token;
};