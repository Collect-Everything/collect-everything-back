import z from "zod";

export const LoginDTO = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const RegisterBaseDTO = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  firstname: z.string(),
  lastname: z.string(),
});

export const AdminRegisterDTO = RegisterBaseDTO;

export const CompanyUserRegisterDTO = RegisterBaseDTO.extend({
  role_id: z.string(),
});

export const ClientRegisterDTO = RegisterBaseDTO;

export const RefreshTokenDTO = z.object({
  token: z.string(),
});

export const USER_TYPES = ["admin", "company_user", "client"] as const;
export type UserType = (typeof USER_TYPES)[number];

export const registerSchema: Record<UserType, z.Schema<any>> = {
  admin: AdminRegisterDTO,
  company_user: CompanyUserRegisterDTO,
  client: ClientRegisterDTO,
};

export const RegisterDTO = z.object({
  type: z.enum(USER_TYPES),
  data: z.union([AdminRegisterDTO, CompanyUserRegisterDTO, ClientRegisterDTO]),
});

export type LoginDTO = z.infer<typeof LoginDTO>;
export type AdminRegisterDTO = z.infer<typeof AdminRegisterDTO>;
export type CompanyUserRegisterDTO = z.infer<typeof CompanyUserRegisterDTO>;
export type ClientRegisterDTO = z.infer<typeof ClientRegisterDTO>;
export type RefreshTokenDTO = z.infer<typeof RefreshTokenDTO>;
export type RegisterDTO = z.infer<typeof RegisterDTO>;
