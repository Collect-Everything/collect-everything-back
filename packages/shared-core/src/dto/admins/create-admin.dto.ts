import { z } from "zod";

export const CreateAdminDto = z.object({
  email: z.string().email(),
  password: z.string(),
  firstname: z.string(),
  lastname: z.string(),
});

export type CreateAdminDto = z.infer<typeof CreateAdminDto>;
