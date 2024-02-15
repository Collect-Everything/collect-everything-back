import z from "zod";

export const CustomerBaseSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  password: z.string(),
});
export const CustomerSchema = CustomerBaseSchema.extend({
  id: z.number(),
  role_id: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type TCustomerBase = z.infer<typeof CustomerBaseSchema>;
export type TCustomer = z.infer<typeof CustomerSchema>;
