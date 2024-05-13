import { ErrorRequestHandler } from "express";
import { errorHandler } from "../helpers";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  errorHandler(res, err, req.originalUrl);
};
