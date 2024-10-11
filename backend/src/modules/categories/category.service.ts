import prisma from "../../prisma/prisma";
import { ClientSideError } from "../../utils/errors/clientSideError";
export const createCategoryService = async (name: string) => {
  const categoryExists = await prisma.category.findUnique({ where: { name } });

  if (!categoryExists) {
    throw new ClientSideError("Category not found !", 404);
  }

  const category = await prisma.category.create({ data: { name } });
  return category;
};
