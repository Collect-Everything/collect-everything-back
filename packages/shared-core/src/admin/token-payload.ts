import { z } from "zod";

export const AdminTokenPayloadSchema = z.object({
  id: z.string(),
  email: z.string(),
  firstname: z.string(),
  lastname: z.string(),
});

export type AdminTokenPayload = z.infer<
  typeof AdminTokenPayloadSchema
>;
