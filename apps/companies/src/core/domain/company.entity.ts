import { Entity, EntityValidationError } from "@ce/shared-core";
import { z } from "zod";
import {
  StoreConfiguration,
  StoreConfigurationData,
} from "./store-configuration.vo";

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
  siret: z.string().optional(),
  storeConfiguration: z.instanceof(StoreConfiguration).optional(),
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
  siret?: string;
  storeConfiguration?: StoreConfigurationData;
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
    return {
      ...this._props,
      storeConfiguration: this._props.storeConfiguration?.props,
    };
  }

  get storeConfiguration(): StoreConfigurationData | undefined {
    return this._props.storeConfiguration?.props;
  }

  configureStore(data: StoreConfigurationData) {
    this._props.storeConfiguration = StoreConfiguration.fromData(data);
  }

  static fromData(data: CompanyData): Company {
    return new Company({
      ...data,
      storeConfiguration: data.storeConfiguration
        ? StoreConfiguration.fromData(data.storeConfiguration)
        : undefined,
    });
  }

  private validate() {
    const result = CompanyPropsSchema.safeParse(this._props);

    if (!result.success) {
      throw new EntityValidationError(result.error.errors);
    }
  }
}
