import { ZodSchema } from 'zod';
import { Request, Response } from 'express';
import { boldLog, redLog } from './console';
import { ERROR_CODES, HttpException, STATUS_TEXT } from '../errors';
import { BaseResponse } from '../types';

export interface ErrorResponse {
  statusText: string;
  message?: string;
  errors?: any[];
}
export async function ctrlWrapper(
  identifier: string,
  response: Response,
  handler: () => Promise<BaseResponse>
) {
  try {
    const result = await handler();
    response.status(result.status ?? 200).send(result);
  } catch (error) {
    if (error instanceof HttpException) {
      httpErrorHandler(response, error, identifier);
    } else {
      response.status(500).send({
        error: 'Internal server error',
        statusText: 'Internal Server Error'
      });
      logError(identifier, 'Error throwed in controller', error);
    }
  }
}

export function getJsonBody(req: Request) {
  if (!req.is('application/json')) {
    return JSON.parse(req.body.data);
  }
  return req.body;
}

export function parseBody<T>(req: Request, schema: ZodSchema<T>): T {
  const body = getJsonBody(req);

  if (!body) {
    throw new HttpException(400, 'Invalid request body');
  }

  const result = schema.safeParse(body);

  if (result.success) {
    return result.data;
  } else {
    throw new HttpException(
      400,
      'Body validation error',
      result.error.errors,
      ERROR_CODES.BODY_VALIDATION_ERROR
    );
  }
}

const formatError = (identifier: string, message: string) => {
  return `[${identifier}] : ${message}`;
};

const logError = (identifier: string, message: string, details?: any) => {
  if (process.env.NODE_ENV !== 'production') {
    const date = new Date().toISOString();

    console.log(
      `${boldLog(redLog(date + ' | '))}${redLog(
        formatError(identifier, message)
      )}`
    );

    if (details) {
      console.error(details);
    }
  }
};

export function httpErrorHandler(
  res: Response,
  error: HttpException,
  identifier: string
) {
  const message = error.message;
  let status = error.status;

  logError(identifier, message.toString(), error.errors);

  res.status(status).send({
    message,
    statusText: STATUS_TEXT?.[status] ?? 'Unknown',
    errors: error.errors
  });
}
