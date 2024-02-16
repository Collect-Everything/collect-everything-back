import { z } from "zod";

export const RefreshTokenDto = z.object({
  token: z.string(),
});

export type RefreshTokenDto = z.infer<typeof RefreshTokenDto>;
