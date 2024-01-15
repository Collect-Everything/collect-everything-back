import { Response } from "express";
import { BaseError } from "../helpers/error-builder";
import pino from "pino";

export const errorHandler = (
  err: unknown,
  res: Response,
  logger: pino.Logger,
) => {
  logger.error(err);

  if (err instanceof BaseError) {
    res.status(err.statusCode).send({ error: err.serialize() });
    return;
  } else if (err instanceof Error) {
    res.status(500).send({ error: err.message });
  } else {
    res.status(500).send({ error: "Internal Server Error" });
  }
};
