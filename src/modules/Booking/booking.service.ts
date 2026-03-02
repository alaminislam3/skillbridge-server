import { Booking, BookingStatus } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middlewares/auth";

const createBooking = async (payload: Omit<Booking, "id"| "createdAt"| "updateedAt">, userId : string) => {
  const userCheck = await prisma.user.findUnique({
    where :{
       id : userId
    }
  })
  if (!userCheck){
   throw new Error ("user isn't valid")
  }

  const tutor = await prisma.tutorProfile.findUnique({
    where : {
       userId : payload.tutorId      /* can be change  */
    }
  })
  if (!tutor){
    throw new Error ("tutor not found ")
  }
  if(tutor.price == null){
     throw new Error ("tutor price not found ")
  }
 
  // calculation – make sure the dates are not null
  if (!payload.startDate || !payload.endDate) {
    throw new Error("startDate and endDate must be provided");
  }

  const startTime = new Date(payload.startDate).getTime(); // Miliseconds 1
  const endTime = new Date(payload.endDate).getTime(); // Miliseconds  10


  if (endTime <= startTime) {
    throw new Error("End date must be after start date");
  }

   const duration = endTime - startTime;
  console.log(duration); // Miliseconds

  const durationInHour = duration / (1000 * 60 * 60);

  const totalPrice = durationInHour * tutor.price;

  const result = await prisma.booking.create({
    data: {...payload, studentId: userCheck.id, totalPrice}
});

  
  return result;
};

const getAllBooking = async () => {
  
  const result = await prisma.booking.findMany();

  
  return result;
};


const getSingleBooking = async (paramsId : string) => {
  
  const result = await prisma.booking.findUnique({
    where : {
      id : paramsId
    },
    
  })
  return result
}

const updateBookingStatus = async (status : BookingStatus , bookingId: string, userRole : UserRole)=> {
  const booking = await prisma.booking.findUnique({
    where :{
      id : bookingId
    }
  })
  if(!booking){
    throw new Error ("booking not found ")
  }
   if (userRole === UserRole.student) {
    // student শুধু cancel করতে পারবে
    if (status !== BookingStatus.CANCELLED) {
      throw new Error("Student can only cancel booking");
    }

    // confirmed হলে cancel করা যাবে না
    if (booking.status === BookingStatus.CONFIRMED) {
      throw new Error("Confirmed booking cannot be cancelled by student");
    }
  }

  const result = await prisma.booking.update({
    where : {
      id : bookingId
    },
    data : {
    status : status
    }
  })
  return  result
}


export const BookingService = {
createBooking,
getAllBooking,
getSingleBooking,
updateBookingStatus
    }