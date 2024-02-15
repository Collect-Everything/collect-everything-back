import { NextFunction, Request, Response } from "express";
import { errorBuilder } from "../errors";
import { Gateway } from "../config";
import { createGatewayApiKey } from "../helpers/api-key";

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

    const hash = createGatewayApiKey(providedGateway, secret);

    if (providedApiKey !== hash) {
      return res.status(403).send(errorBuilder.forbidden());
    }

    next();
  };
