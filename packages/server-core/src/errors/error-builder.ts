import { HttpException } from "./http-exception";

export const errorBuilder = {
  unauthorized: (message?: string) =>
    new HttpException(401, message ?? "Unauthorized"),
  forbidden: (message?: string) =>
    new HttpException(403, message ?? "Forbidden"),
  notFound: (message?: string) =>
    new HttpException(404, message ?? "Not Found"),
  badRequest: (message?: string) =>
    new HttpException(400, message ?? "Bad Request"),
  internalServerError: (message?: string) =>
    new HttpException(500, message ?? "Internal Server Error"),
};
