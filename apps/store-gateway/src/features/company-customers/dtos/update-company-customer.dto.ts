import z from 'zod';

export const UpdateCompanyCustomerDTOSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(8).max(100).optional(),
  firstname: z.string().optional(),
  lastname: z.string().optional()
});

export type UpdateCompanyCustomerDTO = z.infer<
  typeof UpdateCompanyCustomerDTOSchema
>;
