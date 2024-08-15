import { Company, CompanyData } from "../domain/company.entity";

export class CompanyMapper {
  static toDomain(raw: any): Company {
    const data: CompanyData = {
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
      subscriptionStatus: raw.subscriptionStatus,
      subscriptionUpdatedAt: raw.subscriptionUpdatedAt,
    };

    if (raw.storeName) {
      data.storeConfiguration = {
        storeName: raw.storeName,
        color: raw.color,
        logo: raw.logo,
        keyPhrases: raw.keyPhrases,
        productsType: raw.productsType,
        phoneContact: raw.phoneContact,
        emailContact: raw.emailContact,
        links: raw.links,
        externalUrl: raw.externalUrl,
      };
    }
    return Company.fromData(data);
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
      storeName: company.storeConfiguration?.props.storeName,
      color: company.storeConfiguration?.props.color,
      logo: company.storeConfiguration?.props.logo,
      keyPhrases: company.storeConfiguration?.props.keyPhrases,
      productsType: company.storeConfiguration?.props.productsType,
      phoneContact: company.storeConfiguration?.props.phoneContact,
      emailContact: company.storeConfiguration?.props.emailContact,
      links: company.storeConfiguration?.props.links,
      externalUrl: company.storeConfiguration?.props.externalUrl,
      subscriptionStatus: company.data.subscriptionStatus,
      subscriptionUpdatedAt: company.data.subscriptionUpdatedAt,
    };
  }
}
