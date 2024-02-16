import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { Req } from "../types";
import {
  AdminTokenPayload,
  CompanyUserTokenPayload,
  CompanyCustomerTokenPayload,
} from "@ce/shared-core";

export const jwtMiddleware: RequestHandler = (req, _res, next) => {
  if (req && req.headers.authorization) {
    const [scheme, token] = req.headers.authorization.split(" ");
    if (scheme && token) {
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error("Env variable JWT_SECRET is not defined");
      }
      jwt.verify(token, secret, (_err, decoded) => {
        const jwtPayload = decoded as {
          data:
            | AdminTokenPayload
            | CompanyUserTokenPayload
            | CompanyCustomerTokenPayload;
          iat: number;
          exp: number;
        };
        (req as Req).user = jwtPayload?.data;
      });
    }
  }

  next();
};
