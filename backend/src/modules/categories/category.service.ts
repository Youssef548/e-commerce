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

export const updateCategoryService = async (
  id: string,
  data: { name: string }
) => {
  const { name } = data;
  const categoryId = parseInt(id);
  const categoryExists = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!categoryExists) {
    throw new ClientSideError("Category not found", 404);
  }

  const updatedCategory = await prisma.category.update({
    where: { id: categoryId },
    data: { name },
  });

  return updatedCategory;
};

export const deleteCategoryService = async (id: string) => {
  const categoryId = parseInt(id);
  const categoryExists = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!categoryExists) {
    throw new ClientSideError("Category not found", 404);
  }

  const deletedCategory = await prisma.category.delete({
    where: { id: categoryId },
  });

  return deletedCategory;
};

export const listCategorysService = async () => {
  const categories = await prisma.category.findMany();
  return categories;
};
