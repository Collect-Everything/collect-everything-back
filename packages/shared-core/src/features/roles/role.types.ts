import z from "zod";

export const ROLES = ["ADMIN", "STOCK_MANAGER", "ORDER_MANAGER"] as const;

export const Role = z.enum(ROLES);

export type Role = z.infer<typeof Role>;
