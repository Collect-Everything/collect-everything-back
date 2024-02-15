import { ZodError } from "zod";
import { boldLog, redLog } from "../helpers/console";
import { BaseError } from "./base-error";
import { Response } from "express";
import { ERROR_KEYS } from "@ce/shared-core";

const formatError = (identifier: string, message: string) => {
  return `[${identifier}] : ${message}`;
};

const logError = (identifier: string, message: string) => {
  if (process.env.NODE_ENV !== "production") {
    const date = new Date().toISOString();

    console.log(
      `${boldLog(redLog(date + " - API ERROR | "))}${redLog(
        formatError(identifier, message),
      )}`,
    );
  }
};

export function baseErrorHandler(
  res: Response,
  error: BaseError,
  identifier: string,
) {
  const message = error.message || error.key;
  let status = error.getStatusCode();

  logError(identifier, message.toString());
  res.status(status).send({
    error: formatError(identifier, message),
    statusText: error.key,
  });
}

export function zodErrorHandler(
  res: Response,
  error: ZodError,
  identifier: string,
) {
  logError(identifier, error.toString());
  res.status(400).send({
    error: formatError(identifier, error.message),
    statusText: ERROR_KEYS.zodError,
  });
}

export const errorHandler = (
  identifier: string,
  res: Response,
  error: unknown,
) => {
  if (error instanceof BaseError) {
    return baseErrorHandler(res, error, identifier);
  } else if (error instanceof ZodError) {
    return zodErrorHandler(res, error, identifier);
  } else if (error instanceof Error) {
    logError(identifier, error.message);

    return res.status(500).send({
      success: false,
      statusText: ERROR_KEYS.unknown,
      error: error.message,
    });
  } else {
    logError(identifier, "Unknown error");
    return res.status(500).send({
      success: false,
      statusText: ERROR_KEYS.unknown,
      error: "Unknown error",
    });
  }
};
