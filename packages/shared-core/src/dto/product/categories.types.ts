import z from "zod";

export const CategoryBaseSchema = z.object({
    name: z.string(),
    company_id: z.number(),
});
export const CategorySchema = CategoryBaseSchema.extend({
  id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  deleted_at: z.date(),
});

export type TCategoryBase = z.infer<typeof CategoryBaseSchema>;
export type TCategory = z.infer<typeof CategorySchema>;
