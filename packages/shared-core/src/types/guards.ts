export const isString = (value: string | unknown): value is string => {
  return typeof value === "string";
};
