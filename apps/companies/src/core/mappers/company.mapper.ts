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
      siret: raw.siret,
      storeConfiguration: {
        storeName: raw.store_name,
        color: raw.color,
        logo: raw.logo,
        keyPhrases: raw.key_phrases,
        productsType: raw.products_type,
        phoneContact: raw.phone_contact,
        emailContact: raw.email_contact,
        links: raw.links,
        externalUrl: raw.external_url,
      },
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
      siret: company.data.siret,
      store_name: company.storeConfiguration?.storeName,
      color: company.storeConfiguration?.color,
      logo: company.storeConfiguration?.logo,
      key_phrases: company.storeConfiguration?.keyPhrases,
      products_type: company.storeConfiguration?.productsType,
      phone_contact: company.storeConfiguration?.phoneContact,
      email_contact: company.storeConfiguration?.emailContact,
      links: company.storeConfiguration?.links,
      external_url: company.storeConfiguration?.externalUrl,
    };
  }
}
