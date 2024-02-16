import z from "zod";

export const CompanyUserBaseSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  password: z.string(),
  company_id: z.number(),
  role_id: z.string(),
});
export const CompanyUserSchema = CompanyUserBaseSchema.extend({
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type TCompanyUserBase = z.infer<typeof CompanyUserBaseSchema>;
export type TCompanyUser = z.infer<typeof CompanyUserSchema>;
