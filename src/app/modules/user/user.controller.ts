import httpStatus from "http-status";
import { ERROR, SUCCESS } from "../../utils/api.response.types";

import { UserServices } from "./user.service";
import asyncErrorHandler from "../../utils/asyncErrorHandler";

const registerUser = asyncErrorHandler(async (req, res) => {
  try {
    const userData = req.body;
    console.log(userData);
    const result = await UserServices.createUserIntoDB(userData);

    SUCCESS(res, httpStatus.OK, "User is created successfully", result);
  } catch (error) {
    ERROR(res, httpStatus.INTERNAL_SERVER_ERROR, "Failed to create user", [
      error,
    ]);
  }
});

const getMe = asyncErrorHandler(async (req, res) => {
  try {
    const token = req.headers.authorization ? req.headers.authorization : "";
    const result = await UserServices.getMe(token);

    SUCCESS(res, httpStatus.OK, "User is retrieved successfully", result);
  } catch (error) {
    ERROR(res, httpStatus.INTERNAL_SERVER_ERROR, "Failed to retrieve user", [
      error,
    ]);
  }
});

const changeStatus = asyncErrorHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const result = await UserServices.changeStatus(id, req.body);

    SUCCESS(res, httpStatus.OK, "Status is updated successfully", result);
  } catch (error) {
    ERROR(res, httpStatus.INTERNAL_SERVER_ERROR, "Failed to update status", [
      error,
    ]);
  }
});

export const UserControllers = {
  registerUser,
  getMe,
  changeStatus,
};
