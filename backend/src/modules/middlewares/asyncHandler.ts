import { Request, Response, NextFunction } from "express";

const asyncHandler = (fn: any, statusCode: number = 200) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await fn(req, res, next);
      if (result) {
        res.status(statusCode).json(result);
      }
    } catch (error) {
      next(error);
    }
  };
};

export default asyncHandler;
