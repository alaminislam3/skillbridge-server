import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.registerUser(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "user created",
      data: result,
    });
  } catch (err:any) {
    next(err)
  }
};

const loginUser = async (req: Request, res: Response,next: NextFunction) => {
  // console.log("here is the user",req.user)
  try {
    const result = await UserService.loginUser(req.body);

    res.cookie("token", result.token, {
      secure: false,
      httpOnly: true,
      sameSite: "strict",
    });

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "user logged in successfully",
      data: result,
    });
  } catch (error) {
    next(error)
  }
};

export const UserController = {
  registerUser,
  loginUser,
};
