import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function teardown() {
  await prisma.$disconnect();
}
