import { NextFunction, Response } from "express";
import { errorBuilder } from "../errors/error-builder";
import { Req } from "..";

export const isLogged = (req: Req, res: Response, next: NextFunction) => {
  const isLogged = !!req.user;
  if (!isLogged) {
    throw errorBuilder.unauthorized();
  }

  return next();
};

export const isAdmin = (req: Req, res: Response, next: NextFunction) => {
  const user = req.user;
  if (!user) {
    res.status(401).send(errorBuilder.unauthorized());
  }

  if (!user.roles?.includes("ADMIN")) {
    res.status(403).send(errorBuilder.forbidden());
  }

  return next();
};
