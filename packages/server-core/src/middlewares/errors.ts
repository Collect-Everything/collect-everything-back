import { ErrorRequestHandler } from "express";
import { errorHandler } from "../errors/error-handler";

export const globalErrorHandler: ErrorRequestHandler = (err, req, res) => {
  console.log("Global error handler");
  errorHandler(req.url, res, err);
};
