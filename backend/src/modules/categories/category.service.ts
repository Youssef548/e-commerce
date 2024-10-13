import prisma from "../../prisma/prisma";
import { ClientSideError } from "../../utils/errors/clientSideError";
export const createCategoryService = async (name: string) => {
  const categoryExists = await prisma.category.findUnique({ where: { name } });

  if (categoryExists) {
    throw new ClientSideError("Category already exits", 400);
  }

  const category = await prisma.category.create({ data: { name } });
  return category;
};
