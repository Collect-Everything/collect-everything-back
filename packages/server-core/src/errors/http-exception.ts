import { ERROR_CODES } from './keys';
import { STATUS_TEXT } from './status-text';

export class HttpException extends Error {
  constructor(
    public status: number,
    public message: string,
    public errors?: any[],
    public key?: string
  ) {
    super(message);
  }
}

interface ErrorParams {
  errors?: any[];
  message?: string;
}

export class UnknownError extends HttpException {
  constructor(params?: ErrorParams) {
    super(
      500,
      params?.message ?? STATUS_TEXT[500],
      params?.errors,
      ERROR_CODES.UNKNOWN
    );
  }
}

export class BadRequestError extends HttpException {
  constructor(params?: ErrorParams) {
    super(
      400,
      params?.message ?? STATUS_TEXT[400],
      params?.errors,
      ERROR_CODES.INVALID_REQUEST_BODY
    );
  }
}

export class BodyValidationError extends HttpException {
  constructor(params?: ErrorParams) {
    super(
      400,
      params?.message ?? STATUS_TEXT[400],
      params?.errors,
      ERROR_CODES.BODY_VALIDATION_ERROR
    );
  }
}

export class NotFoundError extends HttpException {
  constructor(params?: ErrorParams) {
    super(
      404,
      params?.message ?? STATUS_TEXT[404],
      params?.errors,
      ERROR_CODES.API_ERROR
    );
  }
}

export class ForbiddenError extends HttpException {
  constructor(params?: ErrorParams) {
    super(
      403,
      params?.message ?? STATUS_TEXT[403],
      params?.errors,
      ERROR_CODES.API_ERROR
    );
  }
}

export class ConflictError extends HttpException {
  constructor(params?: ErrorParams) {
    super(
      409,
      params?.message ?? STATUS_TEXT[409],
      params?.errors,
      ERROR_CODES.API_ERROR
    );
  }
}
