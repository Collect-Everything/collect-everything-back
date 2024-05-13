import { NextFunction, Response } from "express";
import { Req } from "../types";
import { errorBuilder } from "../errors/error-builder";

export const isLogged = (req: Req, res: Response, next: NextFunction) => {
  const isLogged = !!req.user;
  if (!isLogged) {
    throw errorBuilder.unauthorized();
  }

  next();
};

export const isAdmin = (req: Req, res: Response, next: NextFunction) => {
  const user = req.user;
  console.log("user", user);
  if (!user) {
    throw errorBuilder.unauthorized();
  }

  if (user.role !== "admin") {
    throw errorBuilder.forbidden();
  }

  next();
};
