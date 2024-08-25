export interface ConfigureStoreCommand {
  companyId: string;
  storeName?: string;
  color?: string;
  logo?: string;
  title?: string;
  description?: string;
  button?: string;
  image?: string;
  advantages?: { title: string; description: string; icon?: string }[];
  productsType?: string;
  phoneContact?: string;
  emailContact?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  externalUrl?: string;
}
