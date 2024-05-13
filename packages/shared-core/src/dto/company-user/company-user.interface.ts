import { CompanyUserRole } from "./roles";

export interface CompanyUser {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: CompanyUserRole;
  company_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
