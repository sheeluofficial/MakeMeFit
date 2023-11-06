import { NextFunction, Request, Response } from "express"

type passedFunction = (
    req: Request, 
    res: Response,
    next: NextFunction
  ) => Promise<void>;

const asyncErrorWrapper = (passedFunction : passedFunction )=>(req : Request,res : Response,next : NextFunction)=>{
    Promise.resolve(passedFunction(req,res,next)).catch(next)
}

export default asyncErrorWrapper;
