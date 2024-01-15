import { NextFunction, Request, Response } from "express";
import { TAdminTokenData } from "@/features/auth";

export type CustomRequest = Request & {
  user?: TAdminTokenData;
};

export type CustomRequestHandler = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => void;

export type CustomErrorHandler = (
  err: Error,
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => void;
