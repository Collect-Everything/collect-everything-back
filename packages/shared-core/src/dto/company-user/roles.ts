import z from "zod";

export const COMPANY_USER_ROLES = [
  "ADMIN",
  "STOCK_MANAGER",
  "ORDER_MANAGER",
] as const;

export const CompanyUserRoleSchema = z.enum(COMPANY_USER_ROLES);

export type CompanyUserRole = z.infer<typeof CompanyUserRoleSchema>;
