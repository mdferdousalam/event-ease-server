/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { USER_ROLE } from "../utils/user.enums";
import { ERROR } from "../utils/api.response.types";
import { User } from "../modules/user/user.model";



const requireAuth = (...requiredRoles: USER_ROLE[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      // Extract the token from the "Bearer" schema
      const token = authHeader?.split(" ")[1];
      console.log("token is missing");
      // Check if the token is missing
      if (!token) {
        return ERROR(
          res,
          httpStatus.UNAUTHORIZED,
          "You are not authorized!",
          []
        );
      }

      // Verify if the given token is valid
      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;

      const { role, userId } = decoded;

      // Check if the user exists
      const user = await User.findById(userId);

      if (!user) {
        return ERROR(res, httpStatus.NOT_FOUND, "This user is not found!", []);
      }

      // Check if the user's role is in the required roles
      if (requiredRoles.length && !requiredRoles.includes(role)) {
        return ERROR(
          res,
          httpStatus.UNAUTHORIZED,
          "You are not authorized!",
          []
        );
      }

      // Attach the user info to the request object
      req.user = decoded as JwtPayload & { role: string };
      next();
    } catch (err: any) {
      return ERROR(
        res,
        httpStatus.UNAUTHORIZED,
        err.message || "Authentication failed!",
        [],
        err.stack
      );
    }
  };
};

export default requireAuth;
