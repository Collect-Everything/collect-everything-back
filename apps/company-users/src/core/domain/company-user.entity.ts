import {
  COMPANY_USER_ROLES,
  CompanyUserRole,
  Entity,
  EntityValidationError,
} from "@ce/shared-core";
import { z } from "zod";

const CompanyUserPropsSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  companyId: z.string(),
  role: z.enum(COMPANY_USER_ROLES),
});

export type CompanyUserProps = z.infer<typeof CompanyUserPropsSchema>;

export interface CompanyUserData {
  id: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  companyId: string;
  role: CompanyUserRole;
}

export class CompanyUser extends Entity<CompanyUserProps, string> {
  constructor(props: CompanyUserProps) {
    super(props);

    this.validate();
  }

  get email() {
    return this._props.email;
  }

  get data(): CompanyUserData {
    return {
      id: this._props.id,
      email: this._props.email,
      password: this._props.password,
      firstname: this._props.firstname,
      lastname: this._props.lastname,
      companyId: this._props.companyId,
      role: this._props.role,
    };
  }

  static fromData(data: CompanyUserData): CompanyUser {
    return new CompanyUser({
      id: data.id,
      email: data.email,
      password: data.password,
      firstname: data.firstname,
      lastname: data.lastname,
      companyId: data.companyId,
      role: data.role,
    });
  }

  private validate() {
    const result = CompanyUserPropsSchema.safeParse(this._props);
    if (!result.success) {
      throw new EntityValidationError(result.error.errors);
    }
  }
}
