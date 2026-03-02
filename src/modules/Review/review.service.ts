import { Booking } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createReview = async (payload: Omit<Booking,  "createdAt"| "updateedAt">, userId : string) => {
  //  check if user exist 
  // check booking is exist 
  // check status is complete 
  
  const userCheck = await prisma.user.findUnique({
    where :{
       id : userId
    }
  })
  if (!userCheck){
   throw new Error ("user isn't valid")
  }
  const bookingCheck = await prisma.booking.findUnique({
    where : {
      id : payload.id
    }
  })
  if (!bookingCheck){
    throw new Error ("booking not found")
  }
  if(bookingCheck.status !== "COMPLETED"){
    throw new Error ("booking status should be complete first ")
  }

  const result = await prisma.review.create({
    data: {...payload, studentId: userCheck.id , bookingId: bookingCheck.id}
    
});

  
  return result;
};
export const ReviewService = {
createReview    };