import { NextFunction, Request, Response } from "express";
import { Gateway } from "../config";
import { createGatewayApiKey } from "../helpers/api-key";
import { errorBuilder } from "../errors";

export const gatewaysApiKeyMiddleware =
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
      return res.status(500).send(errorBuilder.internalServerError());
    }

    const hash = createGatewayApiKey(providedGateway, secret);

    if (providedApiKey !== hash) {
      return res.status(403).send(errorBuilder.forbidden());
    }

    next();
  };
