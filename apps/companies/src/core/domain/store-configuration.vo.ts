import { ValueObject, ValueObjectValidationError } from '@ce/shared-core';
import { z } from 'zod';
import { Advantage, AdvantageData } from './advantage.vo';

export const StoreConfigurationPropsSchema = z.object({
  storeName: z.string(),
  storeSlug: z.string(),
  color: z.string().nullish(),
  logo: z.string().nullish(),
  title: z.string().nullish(),
  description: z.string().nullish(),
  button: z.string().nullish(),
  image: z.string().nullish(),
  advantages: z.array(z.instanceof(Advantage)).nullish(),
  productsType: z.string().nullish(),
  phoneContact: z.string().nullish(),
  emailContact: z.string().nullish(),
  instagramUrl: z.string().nullish(),
  twitterUrl: z.string().nullish(),
  facebookUrl: z.string().nullish(),
  externalUrl: z.string().nullish()
});

export interface StoreConfigurationData {
  storeName: string;
  storeSlug: string;
  color?: string | null;
  logo?: string | null;
  title?: string | null;
  description?: string | null;
  button?: string | null;
  image?: string | null;
  advantages?: AdvantageData[] | null;
  productsType?: string | null;
  phoneContact?: string | null;
  emailContact?: string | null;
  instagramUrl?: string | null;
  twitterUrl?: string | null;
  facebookUrl?: string | null;
  externalUrl?: string | null;
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

  get storeName(): string {
    return this.props.storeName;
  }

  get storeSlug(): string {
    return this.props.storeSlug;
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
      title: this.props.title,
      description: this.props.description,
      button: this.props.button,
      advantages: this.props.advantages?.map((advantage) => advantage.data),
      productsType: this.props.productsType,
      phoneContact: this.props.phoneContact,
      emailContact: this.props.emailContact,
      instagramUrl: this.props.instagramUrl,
      twitterUrl: this.props.twitterUrl,
      facebookUrl: this.props.facebookUrl,
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
