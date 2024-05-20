import { ValueObject, ValueObjectValidationError } from "@ce/shared-core";
import { z } from "zod";

export const StoreConfigurationPropsSchema = z.object({
  storeName: z.string(),
  color: z.string().optional(),
  logo: z.string().optional(),
  keyPhrases: z.record(z.string()).optional(),
  productsType: z.string().optional(),
  phoneContact: z.string().optional(),
  emailContact: z.string().optional(),
  links: z.record(z.string()).optional(),
  externalUrl: z.string().optional(),
});

export interface StoreConfigurationData {
  storeName: string;
  color?: string;
  logo?: string;
  keyPhrases?: Record<string, string>;
  productsType?: string;
  phoneContact?: string;
  emailContact?: string;
  links?: Record<string, string>;
  externalUrl?: string;
}

export type StoreConfigurationProps = z.infer<
  typeof StoreConfigurationPropsSchema
>;

export const DEFAULT_STORE_COLOR = "#000000";
export const DEFAULT_STORE_LOGO = "";

export class StoreConfiguration extends ValueObject<StoreConfigurationProps> {
  constructor(props: StoreConfigurationProps) {
    super(props);
    this.validate();
  }

  static fromData(data: StoreConfigurationData): StoreConfiguration {
    return new StoreConfiguration({
      ...data,
      color: data.color ?? DEFAULT_STORE_COLOR,
      logo: data.logo ?? DEFAULT_STORE_LOGO,
    });
  }

  private validate() {
    const result = StoreConfigurationPropsSchema.safeParse(this.props);

    if (!result.success) {
      throw new ValueObjectValidationError(
        this.constructor.name,
        result.error.errors,
        result.error.message,
      );
    }
  }
}
