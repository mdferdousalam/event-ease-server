import express from "express";
import validateRequest from "../../middlewares/validateRequest";

import { UserControllers } from "./user.controller";
import { userRegisterValidationSchema } from "./user.validation";
import requireAuth from "../../middlewares/requireAuth";
import { USER_ROLE } from "../../utils/user.enums";

const router = express.Router();

router.post(
  "/register",
  validateRequest(userRegisterValidationSchema),
  UserControllers.registerUser,
);

router.get("/me",
  requireAuth(
    USER_ROLE.ADMIN,
    USER_ROLE.MODERATOR,
    USER_ROLE.NORMAL_USER),
  UserControllers.getMe);

export const UserRoutes = router;
