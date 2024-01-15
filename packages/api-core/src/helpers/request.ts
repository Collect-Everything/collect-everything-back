import { NextFunction, Request, Response } from "express";
import { logger } from "../lib/logger";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info(`${req.ip} - [${req.method}] ${req.originalUrl}`);
  next();
};
