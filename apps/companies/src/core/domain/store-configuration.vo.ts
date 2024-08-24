import { ValueObject, ValueObjectValidationError } from '@ce/shared-core';
import { z } from 'zod';
import { Advantage, AdvantageData } from './advantage.vo';

export const StoreConfigurationPropsSchema = z.object({
  storeName: z.string(),
  storeSlug: z.string(),
  color: z.string().optional(),
  logo: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  button: z.string().optional(),
  advantages: z.array(z.instanceof(Advantage)).optional(),
  productsType: z.string().optional(),
  phoneContact: z.string().optional(),
  emailContact: z.string().optional(),
  links: z.record(z.string()).optional(),
  externalUrl: z.string().optional()
});

export interface StoreConfigurationData {
  storeName: string;
  storeSlug: string;
  color?: string;
  logo?: string;
  title?: string;
  description?: string;
  button?: string;
  advantages?: AdvantageData[];
  productsType?: string;
  phoneContact?: string;
  emailContact?: string;
  links?: Record<string, string>;
  externalUrl?: string;
}

export type StoreConfigurationProps = z.infer<
  typeof StoreConfigurationPropsSchema
>;

export const DEFAULT_STORE_COLOR = '#000000';
export const DEFAULT_STORE_LOGO = '';

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
      advantages: data.advantages?.map((advantage) =>
        Advantage.fromData(advantage)
      )
    });
  }

  get data(): StoreConfigurationData {
    return {
      storeName: this.props.storeName,
      storeSlug: this.props.storeSlug,
      color: this.props.color,
      logo: this.props.logo,
      keyPhrases: this.props.keyPhrases,
      productsType: this.props.productsType,
      phoneContact: this.props.phoneContact,
      emailContact: this.props.emailContact,
      links: this.props.links,
      externalUrl: this.props.externalUrl
    };
  }

  private validate() {
    const result = StoreConfigurationPropsSchema.safeParse(this.props);

    if (!result.success) {
      throw new ValueObjectValidationError(
        this.constructor.name,
        result.error.errors,
        result.error.message
      );
    }
  }
}
