import { NextFunction, Response } from "express";
import { errorBuilder } from "../errors/error-builder";
import { Req } from "../types";

export const isLogged = (req: Req, res: Response, next: NextFunction) => {
  const isLogged = !!req.user;
  if (!isLogged) {
    throw errorBuilder.unauthorized();
  }

  return next();
};

export const isAdmin = (req: Req, res: Response, next: NextFunction) => {
  const user = req.user;
  console.log("user", user);
  if (!user) {
    return res.status(401).send(errorBuilder.unauthorized());
  }

  if (!user.roles?.includes("ADMIN")) {
    return res.status(403).send(errorBuilder.forbidden());
  }

  return next();
};
