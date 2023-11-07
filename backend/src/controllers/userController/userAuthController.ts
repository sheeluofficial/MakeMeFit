import { NextFunction, Request, Response } from "express";
import createAuthService from "../../services/userService/userAuthService";
import { LoginRequestBody, SignupRequestBody } from "../../types/commonTypes";
import asyncErrorWrapper from "../../utils/asyncErrorWrapper";

const authService = createAuthService();

export const userSignupController = asyncErrorWrapper( async (req: Request, res: Response, next : NextFunction) => {
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
});

export const userLoginController = asyncErrorWrapper ( async (req: Request, res: Response, next : NextFunction) => {
    try {
      const { email, password }: LoginRequestBody = req.body;
      const { token, user } = await authService.userLogin(email, password);
      res.status(200).json({ message: "User login successful", token, user });
    } catch (error: any) {
      console.error(error);
    return next(error);
    }
  });

