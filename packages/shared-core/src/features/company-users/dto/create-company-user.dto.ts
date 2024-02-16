import { z } from "zod";
import { CompanyUserRole } from "../role.types";

export const CreateCompanyUserDto = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  firstname: z.string(),
  lastname: z.string(),
  role: CompanyUserRole,
  company_id: z.number(),
});

export type CreateCompanyUserDto = z.infer<typeof CreateCompanyUserDto>;
