import { ZodSchema } from "zod";
import { Request, Response } from "express";
import { boldLog, redLog } from "./console";
import { HttpException, STATUS_TEXT } from "../errors";
import { AxiosError } from "axios";

export interface ErrorResponse {
  statusText: string;
  message?: string;
  errors?: any[];
}
export async function ctrlWrapper(
  identifier: string,
  response: Response,
  handler: () => Promise<any>,
) {
  try {
    const result = await handler();
    response.status(200).send(result);
  } catch (error) {
    if (error instanceof HttpException) {
      errorHandler(response, error, identifier);
    } else if (error instanceof AxiosError) {
      axiosErrorHandler(response, error, identifier);
    } else {
      response.status(500).send({
        error: "Internal server error",
        statusText: "Internal Server Error",
      });
    }
    if (process.env.NODE_ENV !== "production") {
    }
  }
}

export function getJsonBody(req: Request) {
  if (!req.is("application/json")) {
    return JSON.parse(req.body.data);
  }
  return req.body;
}

export function parseBody<T>(req: Request, schema: ZodSchema<T>): T {
  const body = getJsonBody(req);

  if (!body) {
    throw new HttpException(400, "Invalid request body");
  }

  const result = schema.safeParse(body);

  if (result.success) {
    return result.data;
  } else {
    throw new HttpException(400, "Body validation error", result.error.errors);
  }
}

const formatError = (identifier: string, message: string) => {
  return `[${identifier}] : ${message}`;
};

const logError = (identifier: string, message: string) => {
  if (process.env.NODE_ENV !== "production") {
    const date = new Date().toISOString();

    console.log(
      `${boldLog(redLog(date + " - API ERROR | "))}${redLog(formatError(identifier, message))}`,
    );
  }
};

export function errorHandler(
  res: Response,
  error: HttpException,
  identifier: string,
) {
  const message = error.message;
  let status = error.status;

  logError(identifier, message.toString());
  res.status(status).send({
    message,
    statusText: STATUS_TEXT?.[status] ?? "Unknown",
    errors: error.errors,
  });
}

export function axiosErrorHandler(
  res: Response,
  error: AxiosError<ErrorResponse>,
  identifier: string,
) {
  const message = error.response?.data?.message ?? error.message;
  let status = error.status ?? 500;

  logError(identifier, message);
  res.status(status).send({
    message,
    statusText: STATUS_TEXT?.[status] ?? "Unknown",
  });
}
