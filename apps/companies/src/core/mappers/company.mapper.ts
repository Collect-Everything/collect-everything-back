import { Company, CompanyData } from '../domain/company.entity';

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
      subscriptionUpdatedAt: raw.subscriptionUpdatedAt
    };

    if (raw.storeName) {
      data.storeConfiguration = {
        storeName: raw.storeName,
        storeSlug: raw.storeSlug,
        color: raw.color,
        logo: raw.logo,
        title: raw.title,
        description: raw.description,
        button: raw.button,
        image: raw.image,
        advantages: raw.advantages,
        productsType: raw.productsType,
        phoneContact: raw.phoneContact,
        emailContact: raw.emailContact,
        instagramUrl: raw.instagramUrl,
        facebookUrl: raw.facebookUrl,
        twitterUrl: raw.twitterUrl,
        externalUrl: raw.externalUrl
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
      storeSlug: company.storeConfiguration?.props.storeSlug,
      color: company.storeConfiguration?.props.color,
      logo: company.storeConfiguration?.props.logo,
      title: company.storeConfiguration?.props.title,
      image: company.storeConfiguration?.props.image,
      advantages: company.storeConfiguration?.props.advantages?.map(
        (advantage) => advantage.data
      ),
      description: company.storeConfiguration?.props.description,
      button: company.storeConfiguration?.props.button,
      productsType: company.storeConfiguration?.props.productsType,
      phoneContact: company.storeConfiguration?.props.phoneContact,
      emailContact: company.storeConfiguration?.props.emailContact,
      instagramUrl: company.storeConfiguration?.props.instagramUrl,
      facebookUrl: company.storeConfiguration?.props.facebookUrl,
      twitterUrl: company.storeConfiguration?.props.twitterUrl,
      externalUrl: company.storeConfiguration?.props.externalUrl,
      subscriptionStatus: company.data.subscriptionStatus,
      subscriptionUpdatedAt: company.data.subscriptionUpdatedAt
    };
  }
}
