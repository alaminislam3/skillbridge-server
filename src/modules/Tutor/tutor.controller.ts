import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { TutorService } from "./tutor.service";

const createTutorProfile = async (req: Request, res: Response, next: NextFunction) => {
  // console.log("body",req?.body)/
  try {
    const result = await TutorService.createTutorProfile(req.body, req.user?.id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "tutor profile created",
      data: result,
    });
  } catch (err) {
  next(err)
  }
};

const getAllTutorProfile = async (req: Request, res: Response,next: NextFunction) => {
  // console.log(req.user)
  try {
    const result = await TutorService.getAllTutorProfile();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "tutor profile retrived successfully ",
      data: result,
    });
  } catch (err : any) {
    next(err)
  }
};

const getSingleTutorProfile = async (req: Request, res: Response,next: NextFunction) => {
  
  try {
    const result = await TutorService.getSingleTutorProfile(req.params?.id as string);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "tutor profile retrived successfully ",
      data: result,
    });
  } catch (err : any) {
    next(err)
  }
};

const updateTutorProfile = async (req: Request, res: Response,next: NextFunction) => {
  console.log(req.body.status)
  try {
    const result = await TutorService.updateTutorProfile(req.body,req.params?.id as string);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "tutor profile updated successfully ",
      data: result,
    });
  } catch (err : any) {
   next(err)
  }
};




export const TutorController = {
    createTutorProfile,
    getAllTutorProfile,
    getSingleTutorProfile,
    updateTutorProfile,
    
    };