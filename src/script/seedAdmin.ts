import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { UserRole } from "../middlewares/auth";

const seedAdmin = async () => {
  const hashPassword = await bcrypt.hash("123456", 8);
  const adminData = {
    name: "admin",
    email: "admin@g.com",
    role: UserRole.admin,
    password: hashPassword,
  };
  //    is admin already exist
  // if exist then return
  // If not then create
  try{
    const isExist = await prisma.user.findUnique({
        where : {
            email : adminData.email
        }
    })
    if(isExist){
        console.log("admin already exist ")
        return
    }
    const admin = await prisma.user.create({
        data : adminData,
    })
console.log("admin created ")
  }
  catch (err){
    console.log(err)

  } finally {
   await prisma.$disconnect()
  }
};

seedAdmin();
