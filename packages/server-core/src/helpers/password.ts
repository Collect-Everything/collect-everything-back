import bcrypt from "bcrypt";

export const SALT_ROUNDS = 10;

export const hashPassword = (plainTextPassword: string) => {
  return bcrypt.hash(plainTextPassword, SALT_ROUNDS);
};

export const comparePasswords = (plainTextPassword: string, hash: string) => {
  return bcrypt.compare(plainTextPassword, hash);
};
