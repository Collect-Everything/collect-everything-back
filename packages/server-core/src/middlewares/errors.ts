import { ErrorRequestHandler } from "express";
import { errorHandler } from "../errors/error-handler";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  errorHandler(req.url, res, err);
};
