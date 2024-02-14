import z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const RegisterBaseSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  firstname: z.string(),
  lastname: z.string(),
});

export const AdminRegisterSchema = RegisterBaseSchema;

export const CompanyUserRegisterSchema = RegisterBaseSchema.extend({
  role_id: z.string(),
});

export const ClientRegisterSchema = RegisterBaseSchema;

export const RefreshTokenSchema = z.object({
  token: z.string(),
});

export const USER_TYPES = ["admin", "company_user", "client"] as const;
export type UserType = (typeof USER_TYPES)[number];

export const registerSchema: Record<UserType, z.Schema<any>> = {
  admin: AdminRegisterSchema,
  company_user: CompanyUserRegisterSchema,
  client: ClientRegisterSchema,
};

export const RegisterDTO = z.object({
  type: z.enum(USER_TYPES),
  data: z.union([
    AdminRegisterSchema,
    CompanyUserRegisterSchema,
    ClientRegisterSchema,
  ]),
});

export type TLogin = z.infer<typeof LoginSchema>;
export type TAdminRegister = z.infer<typeof AdminRegisterSchema>;
export type TCompanyUserRegister = z.infer<typeof CompanyUserRegisterSchema>;
export type TClientRegister = z.infer<typeof ClientRegisterSchema>;
export type TRefreshToken = z.infer<typeof RefreshTokenSchema>;
export type RegisterDTO = z.infer<typeof RegisterDTO>;
