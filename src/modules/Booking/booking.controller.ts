import { Request, Response , NextFunction} from "express";
import sendResponse from "../../utils/sendResponse";
import { BookingService } from "./booking.service";
import { UserRole } from "../../middlewares/auth";

const createBooking = async (req: Request, res: Response,next: NextFunction) => {
  // console.log("here is user",req?.user)
  // console.log("here is the body",req.body)
  try {
    const result = await BookingService.createBooking(req.body, req.user?.id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Booking  created",
      data: result,
    });
  } catch (err) {
   next(err)
  }
};

const getAllBooking  = async (req: Request, res: Response,next: NextFunction) => {
  // console.log(req.user)
  try {
    const result = await BookingService.getAllBooking();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "booking retrived successfully ",
      data: result,
    });
  } catch (err : any) {
    next(err)
  }
};


const getSingleBooking = async (req: Request, res: Response,next: NextFunction) => {
  
  try {
    const result = await BookingService.getSingleBooking(req.params?.id as string);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "booking  retrived successfully ",
      data: result,
    });
  } catch (err : any) {
    next(err)
  }
};
const updateBookingStatus = async (req: Request, res: Response,next: NextFunction) => {
  try {
    const result = await BookingService.updateBookingStatus(
      req.body.status,
      req.params?.id as string,
      req.user?.role as UserRole   
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "status update successfully ",
      data: result,
    });
  } catch (err: any) {
next(err)
  }
};



export const BookingController = {
createBooking,
getAllBooking,
getSingleBooking,
updateBookingStatus
    };