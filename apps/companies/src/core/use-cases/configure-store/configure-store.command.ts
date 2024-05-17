export interface ConfigureStoreCommand {
  companyId: number;
  storeName: string;
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
