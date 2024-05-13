import { z } from "zod";

export const RefreshTokenDTO = z.object({
  token: z.string(),
});

export type TRefreshTokenDTO = z.infer<typeof RefreshTokenDTO>;
