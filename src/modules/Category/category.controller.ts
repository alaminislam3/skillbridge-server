import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { CategoryService } from "./category.service";

const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  // console.log(req?.user)
  try {
    const result = await CategoryService.createCategory(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "category  created",
      data: result,
    });
  } catch (err) {
    next(err)
  }
};

export const CategoryController = {
createCategory   
 };