import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import asyncErrorHandler from "../utils/asyncErrorHandler";

const validateRequest = (schema: AnyZodObject) => {
  return asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      await schema.parseAsync({
        body: req.body,
        cookies: req.cookies,
      });

      next();
    }
  );
};

export default validateRequest;
