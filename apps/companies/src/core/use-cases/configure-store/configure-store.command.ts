export interface ConfigureStoreCommand {
  companyId: string;
  storeName: string;
  color?: string;
  logo?: string;
  title?: string;
  description?: string;
  button?: string;
  keyPhrases: { title: string; description: string }[];
  productsType?: string;
  phoneContact?: string;
  emailContact?: string;
  links?: Record<string, string>;
  instagramUrl?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  externalUrl?: string;
}
