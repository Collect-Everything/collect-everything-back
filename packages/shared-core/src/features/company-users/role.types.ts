import z from "zod";

export const COMPANY_USER_ROLES = [
  "ADMIN",
  "STOCK_MANAGER",
  "ORDER_MANAGER",
] as const;

export const CompanyUserRole = z.enum(COMPANY_USER_ROLES);

export type CompanyUserRole = z.infer<typeof CompanyUserRole>;
