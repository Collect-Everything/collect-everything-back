import { Entity } from "@ce/shared-core";
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
  password: z.string(),
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
  password: string;
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
  constructor(private props: CompanyProps) {
    super(props);

    this.validate();
  }

  get data(): CompanyData {
    return this.props;
  }

  static fromData(data: CompanyData): Company {
    return new Company(data);
  }

  private validate() {
    CompanyPropsSchema.parse(this.props);
  }
}
