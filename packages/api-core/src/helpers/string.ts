import crypto from "crypto";

export const slugify = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

export const generateRandomString = (length: number) => {
  return crypto.randomBytes(length).toString("hex");
};
