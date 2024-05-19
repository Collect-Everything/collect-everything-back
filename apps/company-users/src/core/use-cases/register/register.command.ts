import { CompanyUserRole } from "@ce/shared-core";

export interface RegisterCommand {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  companyId: string;
  roles: CompanyUserRole[];
}
