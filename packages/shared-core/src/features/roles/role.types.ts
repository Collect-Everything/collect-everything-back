import z from "zod";

const RoleBaseSchema = z.object({
  name: z.string(),
  description: z.string(),
});

const RoleSchema = RoleBaseSchema.extend({
  id: z.string(),
});

export type TRoleBase = z.infer<typeof RoleBaseSchema>;
export type TRole = z.infer<typeof RoleSchema>;
