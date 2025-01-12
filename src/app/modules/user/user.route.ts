/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express';
import validateRequest from '../../middlewares/validateRequest';


import { UserControllers } from './user.controller';
import { userRegisterValidationSchema } from "./user.validation";

const router = express.Router();

router.post(
  "/register",
  validateRequest(userRegisterValidationSchema),
  UserControllers.registerUser
);

router.get('/me',  UserControllers.getMe);

export const UserRoutes = router;
