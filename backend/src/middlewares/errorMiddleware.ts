import { NextFunction, Request, Response } from "express";
import customError from "../utils/customError";


const errorMiddleware = (err : any, req : Request, res : Response, next : NextFunction) => {
  err.message = err.message || "Internal server Error";
  err.statusCode = err.statusCode || 500;

  // Invalid mongodb Id error

  if (err.name === "CastError") {
    const message = `Resourse not found. Invalid: ${err.path}`;
    err = new customError(message, 400);
  }

  // Mongoose key dublicate error

  if(err.code === 11000) {
    const message  = `Dublicate ${Object.keys(err.keyValue)} Entered`
    err = new customError(message,400)
  }


  // Wrong jwt error

  if (err.name === "JsonWebTokenError") {
    const message = `Json web token is Invalid, Try again`;
    err = new customError(message, 400);
  }
  // JWT expire error

  if (err.name === "TokenExpiredError") {
    const message = `Json web token is Expired, Try again`;
    err = new customError(message, 400);
  }


  res.status(err.statusCode).json({ message: err.message, success: false });
};

export default errorMiddleware;
