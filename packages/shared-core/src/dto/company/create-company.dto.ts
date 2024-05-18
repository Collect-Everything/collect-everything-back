import { z } from "zod";

export const CreateCompanyDTOSchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
  addressLabel: z.string(),
  street: z.string(),
  streetNumber: z.string(),
  postalCode: z.string(),
  city: z.string(),
  country: z.string(),
});

export type CreateCompanyDTO = z.infer<typeof CreateCompanyDTOSchema>;
