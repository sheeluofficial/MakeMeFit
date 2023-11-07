import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const userRegistrationValidationCheck = [
    body("firstName").notEmpty().withMessage("First Name is required").trim(),
    body("lastName").notEmpty().withMessage("lastName is required").trim(),
    body("email").isEmail().withMessage("Invalid Email Address"),
    body("password").isLength({min:4}).withMessage('Password must be at least 4 characters long'),
   (req : Request, res : Response, next : NextFunction) =>{
     const isError = validationResult(req);

     if(!isError.isEmpty()) {
        return res.status(400).json({ errors: 'Validation failed' });
     }
     next();
   }
]