import { Entity, EntityValidationError } from "@ce/shared-core";
import { z } from "zod";
import {
  StoreConfiguration,
  StoreConfigurationData,
} from "./store-configuration.vo";

const SUBSCRIPTION_STATUS = [
  "FREE_TRIAL",
  "ACTIVE",
  "CANCELED",
  "EXPIRED",
] as const;
export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUS)[number];
export const SubscriptionStatus = z.enum(SUBSCRIPTION_STATUS);

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
  siret: z.string().nullish(),
  storeConfiguration: z.instanceof(StoreConfiguration).nullish(),
  subscriptionStatus: SubscriptionStatus.default("FREE_TRIAL"),
  subscriptionUpdatedAt: z.date(),
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
  subscriptionStatus: SubscriptionStatus;
  subscriptionUpdatedAt: Date;
  siret?: string;
  storeConfiguration?: StoreConfigurationData;
}

export type CompanyProps = z.infer<typeof CompanyPropsSchema>;

const DAYS_OF_FREE_TRIAL = 14;

export class Company extends Entity<CompanyProps, string> {
  constructor(props: CompanyProps) {
    super(props);

    this.validate();
  }

  get name(): string {
    return this._props.name;
  }

  get email() {
    return this._props.email;
  }

  get subscriptionStatus(): SubscriptionStatus {
    if (
      this._props.subscriptionStatus === "FREE_TRIAL" &&
      this.isFreeTrialExpired()
    ) {
      return "EXPIRED";
    }

    return this._props.subscriptionStatus;
  }

  get data(): CompanyData {
    return {
      ...this._props,
      siret: this._props.siret ?? undefined,
      storeConfiguration: this._props.storeConfiguration?.props,
    };
  }

  get storeConfiguration(): StoreConfiguration | undefined {
    return this._props.storeConfiguration ?? undefined;
  }

  isFreeTrialExpired(now = new Date()) {
    const subscriptionUpdatedAt = this._props.subscriptionUpdatedAt;
    const diff = now.getTime() - subscriptionUpdatedAt.getTime();
    const diffInDays = diff / (1000 * 3600 * 24);
    return diffInDays > DAYS_OF_FREE_TRIAL;
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
