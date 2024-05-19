import z from "zod";

export const CreateCompanyAndAdminDTOSchema = z.object({
  company: z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string().email(),
    addressLabel: z.string(),
    street: z.string(),
    streetNumber: z.string(),
    postalCode: z.string(),
    city: z.string(),
    country: z.string(),
  }),
  admin: z.object({
    email: z.string().email(),
    password: z.string().min(8).max(100),
    firstname: z.string(),
    lastname: z.string(),
  }),
});

export type CreateCompanyAndAdminDTO = z.infer<
  typeof CreateCompanyAndAdminDTOSchema
>;
