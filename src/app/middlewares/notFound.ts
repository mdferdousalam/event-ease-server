import express from "express";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
const notFound: express.RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API Not Found !!",
    error: "",
  });
  return next();
};

export default notFound;
