import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { ReviewService } from "./review.service";

const createReview = async (req: Request, res: Response, next: NextFunction) => {
  console.log("here is user",req?.user)
  console.log("here is the body",req.body)
  try {
    const result = await ReviewService.createReview(req.body, req.user?.id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "review   created",
      data: result,
    });
  } catch (err) {
    next(err)
  }
};

export const ReviewController = {
createReview    };