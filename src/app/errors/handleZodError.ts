import { ZodError, ZodIssue } from "zod";
import httpStatus from "http-status";
import { APIResponseError } from "../utils/api.response.types";

const handleZodError = (err: ZodError): APIResponseError => {
  const errors = err.issues.map((issue: ZodIssue) => ({
    path: issue?.path[issue.path.length - 1],
    message: issue.message,
  }));

  return {
    success: false,
    statusCode: httpStatus.BAD_REQUEST,
    message: "Validation Error",
    errors,
    stack: err.stack,
  };
};

export default handleZodError;
