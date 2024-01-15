import { UUID } from "crypto";

export type Company = {
  id: UUID;
  name: String;
  phone: Number;
  email: String;
  address: JSON;
  colors: JSON;
  logo: string;
  key_phrases: JSON;
  products_type: JSON;
  siret: String;
  phone_contact: Number;
  email_contact: String;
  links: JSON;
  external_url: JSON;
};
