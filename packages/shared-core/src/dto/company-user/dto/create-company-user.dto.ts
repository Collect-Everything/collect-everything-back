import { z } from "zod";
import { CompanyUserRoleSchema } from "../roles";

export const CreateCompanyUserDTOSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  firstname: z.string(),
  lastname: z.string(),
  companyId: z.string(),
  roles: z.array(CompanyUserRoleSchema),
});

export type CreateCompanyUserDTO = z.infer<typeof CreateCompanyUserDTOSchema>;
