import {
  CompanyUserRole,
  Entity,
  EntityValidationError
} from '@ce/shared-core';
import { z } from 'zod';

const CompanyCustomerPropsSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  companyId: z.string(),
  emailVerified: z.boolean().optional()
});

export type CompanyCustomerProps = z.infer<typeof CompanyCustomerPropsSchema>;

export interface CompanyCustomerData {
  id: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  companyId: string;
  emailVerified?: boolean;
}

export class CompanyCustomer extends Entity<CompanyCustomerProps, string> {
  constructor(props: CompanyCustomerProps) {
    super(props);

    this.validate();
  }

  get email() {
    return this._props.email;
  }

  get firstname() {
    return this._props.firstname;
  }

  get lastname() {
    return this._props.lastname;
  }

  get companyId() {
    return this._props.companyId;
  }

  get emailVerified() {
    return this._props.emailVerified;
  }

  get data(): CompanyCustomerData {
    return {
      id: this._props.id,
      email: this._props.email,
      password: this._props.password,
      firstname: this._props.firstname,
      lastname: this._props.lastname,
      companyId: this._props.companyId,
      emailVerified: this._props.emailVerified
    };
  }

  get isVerified() {
    return this._props.emailVerified || false;
  }

  update(data: {
    email?: string;
    firstname?: string;
    lastname?: string;
    role?: CompanyUserRole;
  }) {
    if (data.email) {
      this._props.email = data.email;
      this._props.emailVerified = false;
    }
    if (data.firstname) {
      this._props.firstname = data.firstname;
    }
    if (data.lastname) {
      this._props.lastname = data.lastname;
    }
    this.validate();
  }

  validateEmail() {
    this._props.emailVerified = true;
  }

  static fromData(data: CompanyCustomerData): CompanyCustomer {
    return new CompanyCustomer({
      id: data.id,
      email: data.email,
      password: data.password,
      firstname: data.firstname,
      lastname: data.lastname,
      companyId: data.companyId,
      emailVerified: data.emailVerified
    });
  }

  private validate() {
    const result = CompanyCustomerPropsSchema.safeParse(this._props);
    if (!result.success) {
      throw new EntityValidationError(result.error.errors);
    }
  }
}
