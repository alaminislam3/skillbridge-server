import { prisma } from "../../lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const secret = "fbdskjfbsadojfbsdafbj";

const registerUser = async (payload: any) => {
  const hashPassword = await bcrypt.hash(payload.password, 8);
  const result = await prisma.user.create({
    data: { ...payload, password: hashPassword },
  });
  const { password, ...newResult } = result;
  return newResult;
};
/* here we are returning all except password (line 10)*/


const loginUser = async (payload: any) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  // const bookingStatus = await prisma.booking.findMany()
  if (!user) {
    throw new Error("user not found.please register !");
  }
  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid credential ");
  }
  const userData = {
    id: user.id,
    name: user.name,
    role: user.role,
    status: user.status,
    email: user.email,
  };

  const token = jwt.sign(userData, secret, { expiresIn: "1d" });

  return { token, user };
};

export const UserService = {
  registerUser,
  loginUser,
};
