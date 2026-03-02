import { prisma } from "../../lib/prisma";

const createTutorProfile = async (payload: any, userId: string) => {
  const result = await prisma.tutorProfile.create({
    data: { ...payload, userId: userId },
  });

  return result;
};

const getAllTutorProfile = async () => {
  const result = await prisma.tutorProfile.findMany();

  return result;
};

const getSingleTutorProfile = async (paramsId: string) => {
  const result = await prisma.tutorProfile.findUnique({
    where: {
      id: paramsId,
    },
    include: {
      reviews: true,
    },
  });

  return result;
};

const updateTutorProfile = async (payload: any, userId: string) => {
  const result = await prisma.tutorProfile.update({
    where: {
      id: userId,
    },
    data: {
      ...payload,
    },
  });
  return result;
};

export const TutorService = {
  createTutorProfile,
  getAllTutorProfile,
  getSingleTutorProfile,
  updateTutorProfile,
};
