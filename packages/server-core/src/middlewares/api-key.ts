import { NextFunction, Request, Response } from "express";
import crypto from "crypto";
import { errorBuilder } from "../errors";
import { Gateway } from "../types";

export const gatewaysMiddleware =
  (allowed: Gateway[]) => (req: Request, res: Response, next: NextFunction) => {
    const providedGateway = req.headers?.["x-gateway"] as Gateway;
    const providedApiKey = req.headers?.["x-api-key"];

    if (
      !providedGateway ||
      !allowed.includes(providedGateway) ||
      !providedApiKey
    ) {
      return res.status(403).send(errorBuilder.forbidden());
    }

    const secret = process.env[`${providedGateway.toUpperCase()}_SECRET`];

    if (!secret) {
      return res.status(500).send(errorBuilder.internal());
    }

    const hash = crypto
      .createHmac("sha256", secret)
      .update(providedGateway)
      .digest("hex");

    if (providedApiKey !== hash) {
      return res.status(403).send(errorBuilder.forbidden());
    }

    next();
  };
