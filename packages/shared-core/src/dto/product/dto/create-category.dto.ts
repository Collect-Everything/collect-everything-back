import { z } from "zod";

export const CreateCategoryDto = z.object({
  name: z.string(),
  company_id: z.number(),
});

export type CreateCategoryDto = z.infer<typeof CreateCategoryDto>;