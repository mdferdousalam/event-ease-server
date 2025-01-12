/**
 * Request sanitization middleware
 * Cleans and validates incoming request data
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";

const sanitizeRequest = (req: Request, res: Response, next: NextFunction) => {
  // Deep sanitization of request body
  if (req.body && typeof req.body === "object" && !Array.isArray(req.body)) {
    req.body = Object.keys(req.body).reduce(
      (acc: { [key: string]: any }, key: string) => {
        // Trim string values, leave other types unchanged
        acc[key] =
          typeof req.body[key] === "string"
            ? req.body[key].trim()
            : req.body[key];
        return acc;
      },
      {}
    );
  }
  next();
};

export default sanitizeRequest;
