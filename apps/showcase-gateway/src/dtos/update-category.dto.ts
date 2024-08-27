import { z } from "zod";

export const UpdateCategoryDtoSchema = z.object({
  name: z.string(),
});

export type UpdateCategoryDTO = z.infer<typeof UpdateCategoryDtoSchema>;
