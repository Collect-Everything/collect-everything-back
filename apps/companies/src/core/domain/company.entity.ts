import { Entity, EntityValidationError } from "@ce/shared-core";
import { z } from "zod";

const CompanyPropsSchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  addressLabel: z.string(),
  street: z.string(),
  streetNumber: z.string(),
  postalCode: z.string(),
  city: z.string(),
  country: z.string(),
  color: z.string().optional(),
  logo: z.string().optional(),
  keyPhrases: z.record(z.string()).optional(),
  productsType: z.string().optional(),
  siret: z.string().optional(),
  phoneContact: z.string().optional(),
  emailContact: z.string().optional(),
  links: z.record(z.string()).optional(),
  externalUrl: z.string().optional(),
});

export interface CompanyData {
  id: string;
  name: string;
  phone: string;
  email: string;
  addressLabel: string;
  street: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  country: string;
  color?: string;
  logo?: string;
  keyPhrases?: Record<string, string>;
  productsType?: string;
  siret?: string;
  phoneContact?: string;
  emailContact?: string;
  links?: Record<string, string>;
  externalUrl?: string;
}

export type CompanyProps = z.infer<typeof CompanyPropsSchema>;

export class Company extends Entity<CompanyProps, string> {
  constructor(props: CompanyProps) {
    super(props);

    this.validate();
  }

  get name(): string {
    return this._props.name;
  }

  get data(): CompanyData {
    return this._props;
  }

  static fromData(data: CompanyData): Company {
    return new Company(data);
  }

  private validate() {
    const result = CompanyPropsSchema.safeParse(this._props);

    if (!result.success) {
      throw new EntityValidationError(result.error.errors);
    }
  }
}
