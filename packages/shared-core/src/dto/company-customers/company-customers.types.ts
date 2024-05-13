import z from "zod";

export const CompanyCustomerBaseSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  password: z.string(),
  company_id: z.number(),
});
export const CompanyCustomerSchema = CompanyCustomerBaseSchema.extend({
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  deleted_at: z.string(),
});

export type TCompanyCustomerBase = z.infer<typeof CompanyCustomerBaseSchema>;
export type TCompanyCustomer = z.infer<typeof CompanyCustomerSchema>;
