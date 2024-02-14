import { BaseError } from "./base-error";
import { transformPlainTree } from "../helpers/tree";
import { ERROR_KEYS } from "@ce/shared-core";

type ErrorBuilder = (message?: string, info?: string) => BaseError;

export const errorBuilder = transformPlainTree<
  typeof ERROR_KEYS,
  string,
  ErrorBuilder
>(
  ERROR_KEYS,
  (errorKey) => (message?: string, info?: string) =>
    new BaseError(errorKey, message, info),
);
