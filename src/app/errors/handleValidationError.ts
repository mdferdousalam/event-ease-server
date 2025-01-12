import mongoose from "mongoose";

import httpStatus from "http-status";
import { APIResponseError } from "../utils/api.response.types";

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): APIResponseError => {
  const errors = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => ({
      path: val?.path,
      message: val?.message,
    }),
  );

  return {
    success: false,
    statusCode: httpStatus.BAD_REQUEST,
    message: "Validation Error",
    errors,
    stack: err.stack,
  };
};

export default handleValidationError;
