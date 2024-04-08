import { z } from "zod";
import { CompanyUserRole } from "../model/roles";

export const UpdateCompanyUserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  firstname: z.string(),
  lastname: z.string(),
  role: CompanyUserRole,
  company_id: z.number(),
});

export type UpdateCompanyUser = z.infer<typeof UpdateCompanyUserSchema>;
