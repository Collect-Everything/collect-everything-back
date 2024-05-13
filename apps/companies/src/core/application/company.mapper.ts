import { Company } from "../domain/company.entity";

export class CompanyMapper {
  static toDomain(raw: any): Company {
    return Company.fromData({
      id: raw.id,
      name: raw.name,
      phone: raw.phone,
      email: raw.email,
      addressLabel: raw.address_label,
      street: raw.street,
      streetNumber: raw.street_number,
      postalCode: raw.postal_code,
      city: raw.city,
      country: raw.country,
      password: raw.password,
      color: raw.color,
      logo: raw.logo,
      keyPhrases: raw.key_phrases,
      productsType: raw.products_type,
      siret: raw.siret,
      phoneContact: raw.phone_contact,
      emailContact: raw.email_contact,
      links: raw.links,
      externalUrl: raw.external_url,
    });
  }
  static toPersistence(company: Company) {
    return {
      id: company.id,
      name: company.data.name,
      phone: company.data.phone,
      email: company.data.email,
      address_label: company.data.addressLabel,
      street: company.data.street,
      street_number: company.data.streetNumber,
      postal_code: company.data.postalCode,
      city: company.data.city,
      country: company.data.country,
      password: company.data.password,
      color: company.data.color,
      logo: company.data.logo,
      key_phrases: company.data.keyPhrases,
      products_type: company.data.productsType,
      siret: company.data.siret,
      phone_contact: company.data.phoneContact,
      email_contact: company.data.emailContact,
      links: company.data.links,
      external_url: company.data.externalUrl,
    };
  }
}
