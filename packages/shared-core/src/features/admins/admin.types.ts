import z from "zod";

export const AdminBaseSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const AdminSchema = AdminBaseSchema.extend({
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type TAdminBase = z.infer<typeof AdminBaseSchema>;
export type TAdmin = z.infer<typeof AdminSchema>;
