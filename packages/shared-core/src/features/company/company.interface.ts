export interface Company {
  id: number;
  name: string;
  phone: string;
  email: string;
  address_label: string;
  street: string;
  street_number: string;
  postal_code: string;
  city: string;
  country: string;
  password: string;
  color: string;
  logo: string;
  key_phrases: Record<string, string>;
  products_type: string;
  siret: string;
  phone_contact: string;
  email_contact: string;
  links: Record<string, string>;
  external_url: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
