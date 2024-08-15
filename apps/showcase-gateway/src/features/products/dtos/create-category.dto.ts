import { z } from "zod";

export const CreateCategoryDtoSchema = z.object({
  name: z.string(),
  companyId: z.string(),
});

export type CreateCategoryDTO = z.infer<typeof CreateCategoryDtoSchema>;
