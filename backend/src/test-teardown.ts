import prisma from "./prisma/prisma";

export default async function teardown() {
  await prisma.$disconnect();
}
