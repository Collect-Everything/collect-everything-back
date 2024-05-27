import { ErrorRequestHandler } from "express";
import { httpErrorHandler } from "../helpers";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  httpErrorHandler(res, err, req.originalUrl);
};
