import mongoose from "mongoose";

import httpStatus from "http-status";
import { APIResponseError } from "../utils/api.response.types";

const handleCastError = (err: mongoose.Error.CastError): APIResponseError => {
  const errors = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return {
    success: false,
    statusCode: httpStatus.BAD_REQUEST,
    message: "Invalid ID",
    errors,
    stack: err.stack,
  };
};

export default handleCastError;
