import { z } from "zod";
import { CompanyUserRole } from "../roles";

export const CreateCompanyUserDTOSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  firstname: z.string(),
  lastname: z.string(),
  company_id: z.number(),
  role: CompanyUserRole,
});

export type CreateCompanyUserDTO = z.infer<typeof CreateCompanyUserDTOSchema>;
