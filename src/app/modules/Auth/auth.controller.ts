import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { SUCCESS } from "../../utils/api.response.types";
import { decodeToken } from "../../utils/auth.utils";
import { AuthServices } from "./auth.service";
import asyncErrorHandler from "../../utils/asyncErrorHandler";

const loginUser = asyncErrorHandler(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  });

  SUCCESS(res, httpStatus.OK, "User is logged in successfully!", {
    accessToken,
  });
});

const changePassword = asyncErrorHandler(async (req, res) => {
  const { ...passwordData } = req.body;
  const token = req.headers.authorization;

  // checking if the token is missing
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
  }

  const { userId } = decodeToken(token);
  const result = await AuthServices.changePassword(userId, passwordData);
  SUCCESS(res, httpStatus.OK, "Password is updated successfully!", result);
});

const refreshToken = asyncErrorHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  SUCCESS(
    res,
    httpStatus.OK,
    "Access token is retrieved successfully!",
    result,
  );
});

const forgetPassword = asyncErrorHandler(async (req, res) => {
  const userId = req.body.id;
  const result = await AuthServices.forgetPassword(userId);
  SUCCESS(res, httpStatus.OK, "Reset link is generated successfully!", result);
});

const resetPassword = asyncErrorHandler(async (req, res) => {
  const token = req.headers.authorization
    ? req.headers.authorization
    : req.body.token;
  const result = await AuthServices.resetPassword(req.body, token);
  SUCCESS(res, httpStatus.OK, "Password reset successful!", result);
});

export const AuthControllers = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
