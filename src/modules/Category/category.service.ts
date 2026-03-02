import { prisma } from "../../lib/prisma";

const createCategory = async (payload: any) => {
  
  const result = await prisma.category.create({
    data: payload
});

  
  return result;
};

export const CategoryService = {
 createCategory 
};