import { NextFunction, Request, Response } from "express";
import createAuthService from "../../services/userService/userAuthService";
import { SignupRequestBody } from "../../types/commonTypes";

const authService = createAuthService();

export const userSignupController = async (req: Request, res: Response, next : NextFunction) => {
  try {
    const { firstName, lastName, email, password }: SignupRequestBody =
      req.body;
    const newUser = await authService.userSignup(
      firstName,
      lastName,
      email,
      password
    );
    res.status(201).json({ message: "User signup successful", user: newUser });
  } catch (error:any) {
    console.error(error);
   return next(error);
  }
};