export interface ConfigureStoreCommand {
  companyId: string;
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
