export const ERRORS_KEYS = {
  global: {
    unknown: "UNKNOWN_ERROR",
    unauthorized: "UNAUTHORIZED",
    invalidParameters: "INVALID_PARAMETERS",
    notImage: "NOT_AN_IMAGE",
    invalidFileType: "INVALID_FILE_TYPE",
    notFound: "NOT_FOUND",
    forbidden: "FORBIDDEN",
  },
  events: {
    notFound: "EVENT_NOT_FOUND",
  },
  users: {
    notFound: "USER_NOT_FOUND",
    auth: {
      unauthorized: "UNAUTHORIZED",
      invalidCredentials: "INVALID_CREDENTIALS",
      alreadyExists: "USER_ALREADY_EXISTS",
    },
  },
};

export class BaseError extends Error {
  key: string;
  statusCode: number;

  constructor(key: string, message?: string, statusCode?: number) {
    super(message);
    this.key = key;
    this.statusCode = statusCode || this.getStatusCode();
  }

  serialize = () => {
    const err: { key: string; message?: string } = {
      key: this.key,
    };

    if (this.message) {
      err.message = this.message;
    }

    return err;
  };

  getStatusCode = () => {
    if (this.key === "UNAUTHORIZED") {
      return 401;
    }
    if (this.key.endsWith("NOT_FOUND")) {
      return 404;
    }
    if (this.key.startsWith("INVALID_")) {
      return 400;
    }
    if (this.key === "FORBIDDEN") {
      return 403;
    }
    return 500;
  };
}

export const errorsBuilders = (key: string, message?: string): BaseError => {
  return new BaseError(key, message);
};
