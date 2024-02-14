import z from "zod";

export const AdminBaseSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const AdminSchema = AdminBaseSchema.extend({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type TAdminBase = z.infer<typeof AdminBaseSchema>;
export type TAdmin = z.infer<typeof AdminSchema>;
