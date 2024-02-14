import { errorBuilder } from "../errors/error-builder";
import { ZodSchema } from "zod";
import { Request, Response } from "express";
import { errorHandler } from "../errors/error-handler";

export async function ctrlWrapper(
  identifier: string,
  response: Response,
  handler: () => Promise<any>,
) {
  try {
    const result = await handler();
    response.status(200).send(result);
  } catch (error) {
    errorHandler(identifier, response, error);
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
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
    throw errorBuilder.invalidParameters("Body is required");
  }

  return schema.parse(body);
}
