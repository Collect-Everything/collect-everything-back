import { ERROR_KEYS } from "@ce/shared-core";

export class BaseError extends Error {
  key: string;
  info?: string;

  constructor(key: string, message?: string, info?: string) {
    super(message);
    this.key = key;
    this.info = info;
  }

  getStatusCode = () => {
    if (this.key.endsWith("NOT_FOUND")) return 404;
    if (this.key === ERROR_KEYS.unauthorized) return 401;
    if (this.key === ERROR_KEYS.notImplemented) return 501;
    return 400;
  };

  toString = () => {
    return this.key + "\n" + this.message + "\n" + this.info;
  };
}
