import z from "zod";

export const UserBaseSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  password: z.string(),
});
export const UserSchema = UserBaseSchema.extend({
  id: z.string(),
  role_id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type TUserBase = z.infer<typeof UserBaseSchema>;
export type TUser = z.infer<typeof UserSchema>;
