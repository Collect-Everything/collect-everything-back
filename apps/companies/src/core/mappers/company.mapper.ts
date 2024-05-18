import { Company } from "../domain/company.entity";

export class CompanyMapper {
  static toDomain(raw: any): Company {
    return Company.fromData({
      id: raw.id,
      name: raw.name,
      phone: raw.phone,
      email: raw.email,
      addressLabel: raw.addressLabel,
      street: raw.street,
      streetNumber: raw.streetNumber,
      postalCode: raw.postalCode,
      city: raw.city,
      country: raw.country,
      siret: raw.siret,
      storeConfiguration: {
        storeName: raw.storeName,
        color: raw.color,
        logo: raw.logo,
        keyPhrases: raw.keyPhrases,
        productsType: raw.productsType,
        phoneContact: raw.phoneContact,
        emailContact: raw.emailContact,
        links: raw.links,
        externalUrl: raw.externalUrl,
      },
    });
  }
  static toPersistence(company: Company) {
    return {
      id: company.id,
      name: company.data.name,
      phone: company.data.phone,
      email: company.data.email,
      addressLabel: company.data.addressLabel,
      street: company.data.street,
      streetNumber: company.data.streetNumber,
      postalCode: company.data.postalCode,
      city: company.data.city,
      country: company.data.country,
      siret: company.data.siret,
      storeName: company.storeConfiguration?.storeName,
      color: company.storeConfiguration?.color,
      logo: company.storeConfiguration?.logo,
      keyPhrases: company.storeConfiguration?.keyPhrases,
      productsType: company.storeConfiguration?.productsType,
      phoneContact: company.storeConfiguration?.phoneContact,
      emailContact: company.storeConfiguration?.emailContact,
      links: company.storeConfiguration?.links,
      externalUrl: company.storeConfiguration?.externalUrl,
    };
  }
}
