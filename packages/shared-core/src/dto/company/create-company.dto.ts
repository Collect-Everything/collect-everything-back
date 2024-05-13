import { z } from "zod";

export const CreateCompanySchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
  addressLabel: z.string(),
  street: z.string(),
  streetNumber: z.string(),
  postalCode: z.string(),
  city: z.string(),
  country: z.string(),
  password: z.string(),
});

export type CreateCompany = z.infer<typeof CreateCompanySchema>;
