import { z } from "zod";
import { CompanyUserRoleSchema } from "../roles";

export const UpdateCompanyUserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  firstname: z.string(),
  lastname: z.string(),
  role: CompanyUserRoleSchema,
  company_id: z.number(),
});

export type UpdateCompanyUser = z.infer<typeof UpdateCompanyUserSchema>;
