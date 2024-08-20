import { CompanyUserRole } from '@ce/shared-core';

export interface UpdateCommand {
  id: string;
  email?: string;
  firstname?: string;
  lastname?: string;
}
