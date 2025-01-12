import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthControllers } from "./auth.controller";
import { AuthValidation } from "./auth.validation";
import requireAuth from "../../middlewares/requireAuth";
import { USER_ROLE } from "../../utils/user.enums";

const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  "/change-password",
  requireAuth(USER_ROLE.ADMIN, USER_ROLE.MODERATOR, USER_ROLE.NORMAL_USER),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

router.post(
  "/refresh-token",
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

router.post(
  "/forget-password",
  validateRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword,
);

router.post(
  "/reset-password",
  validateRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthControllers.resetPassword,
);

export const AuthRoutes = router;
