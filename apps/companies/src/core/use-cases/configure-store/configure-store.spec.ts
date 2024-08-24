import { describe, test, beforeEach } from 'vitest';
import {
  CompaniesFixture,
  createCompaniesFixture
} from '../_fixtures/companies-fixture';
import { Company, CompanyData } from '../../domain/company.entity';
import {
  DEFAULT_STORE_COLOR,
  DEFAULT_STORE_LOGO,
  StoreConfiguration
} from '../../domain/store-configuration.vo';
import { StoreNameAlreadyExistsError } from './configure-store.errors';
import { CompanyNotFoundError } from '../../errors/company-not-found';

const testCompanyData: CompanyData = {
  id: '1',
  name: 'Company 1',
  phone: '123456789',
  email: 'company@gmail.com',
  addressLabel: '123 Main St',
  street: 'Main St',
  streetNumber: '123',
  postalCode: '12345',
  city: 'City',
  country: 'Country',
  subscriptionStatus: 'FREE_TRIAL',
  subscriptionUpdatedAt: new Date('2024-08-10')
};

describe('Configure Store', () => {
  let fixture: CompaniesFixture;

  beforeEach(async () => {
    fixture = createCompaniesFixture();

    await fixture.givenSomeCompanies([Company.fromData(testCompanyData)]);
  });

  test('All informations are correct, it should save the configuration', async () => {
    fixture.givenNowIs(new Date('2024-08-10'));
    fixture.givenSomeCompanies([
      Company.fromData({
        id: 'id-1',
        name: 'Company 1',
        phone: '123456789',
        email: 'company@gmail.com',
        addressLabel: '123 Main St',
        street: 'Main St',
        streetNumber: '123',
        postalCode: '12345',
        city: 'City',
        country: 'Country',
        subscriptionStatus: 'FREE_TRIAL',
        subscriptionUpdatedAt: new Date('2024-08-10')
      })
    ]);

    await fixture.whenUserConfiguresStore({
      companyId: 'id-1',
      storeName: 'Store 1',
      title: 'Title',
      description: 'Description',
      button: 'Button',
      advantages: [
        { title: 'Advantage 1', description: 'Description 1' },
        { title: 'Advantage 2', description: 'Description 2' }
      ],
      color: '#FFFFFF',
      logo: '/logo.png'
    });

    await fixture.thenStoreShouldBeConfigured(
      'id-1',
      StoreConfiguration.fromData({
        storeName: 'Store 1',
        storeSlug: 'store-1',
        title: 'Title',
        description: 'Description',
        button: 'Button',
        advantages: [
          { title: 'Advantage 1', description: 'Description 1' },
          { title: 'Advantage 2', description: 'Description 2' }
        ],
        color: '#FFFFFF',
        logo: '/logo.png'
      })
    );
  });

  test('The color is not provided, it should save the configuration with the default color', async () => {
    fixture.givenSomeCompanies([
      Company.fromData({
        id: 'id-1',
        name: 'Company 1',
        phone: '123456789',
        email: 'company@gmail.com',
        addressLabel: '123 Main St',
        street: 'Main St',
        streetNumber: '123',
        postalCode: '12345',
        city: 'City',
        country: 'Country',
        subscriptionStatus: 'FREE_TRIAL',
        subscriptionUpdatedAt: new Date('2024-08-10')
      })
    ]);

    await fixture.whenUserConfiguresStore({
      companyId: 'id-1',
      storeName: 'Store 1',
      logo: '/logo.png'
    });

    await fixture.thenStoreShouldBeConfigured(
      'id-1',
      StoreConfiguration.fromData({
        storeName: 'Store 1',
        storeSlug: 'store-1',
        color: DEFAULT_STORE_COLOR,
        logo: '/logo.png'
      })
    );
  });

  test('The logo is not provided, it should save the configuration with the default logo', async () => {
    fixture.givenSomeCompanies([
      Company.fromData({
        id: 'id-1',
        name: 'Company 1',
        phone: '123456789',
        email: 'company@gmail.com',
        addressLabel: '123 Main St',
        street: 'Main St',
        streetNumber: '123',
        postalCode: '12345',
        city: 'City',
        country: 'Country',
        subscriptionStatus: 'FREE_TRIAL',
        subscriptionUpdatedAt: new Date('2024-08-10')
      })
    ]);

    await fixture.whenUserConfiguresStore({
      companyId: 'id-1',
      storeName: 'Store 1'
    });

    await fixture.thenStoreShouldBeConfigured(
      'id-1',
      StoreConfiguration.fromData({
        storeName: 'Store 1',
        storeSlug: 'store-1',
        color: DEFAULT_STORE_COLOR,
        logo: DEFAULT_STORE_LOGO
      })
    );
  });

  test('The store name is already used for the company, it should throw an error', async () => {
    await fixture.givenSomeCompanies([
      Company.fromData({
        id: '2',
        name: 'Company 2',
        phone: '123456789',
        email: 'company-2@gmail.com',
        addressLabel: '123 Main St',
        street: 'Main St',
        streetNumber: '123',
        postalCode: '12345',
        city: 'City',
        country: 'Country',
        storeConfiguration: {
          storeName: 'Store 1',
          storeSlug: 'store-1',
          color: '#FFFFFF',
          logo: '/logo.png'
        },
        subscriptionStatus: 'FREE_TRIAL',
        subscriptionUpdatedAt: new Date('2024-08-10')
      })
    ]);

    await fixture.whenUserConfiguresStore({
      companyId: '2',
      storeName: 'Store 1',
      color: '#FFFFFF',
      logo: '/logo.png'
    });

    fixture.thenErrorShouldBe(StoreNameAlreadyExistsError);
  });

  test('the company id provided does not exist, it should throw an error', async () => {
    await fixture.whenUserConfiguresStore({
      companyId: 'id-1',
      storeName: 'Store 1',
      color: '#FFFFFF',
      logo: '/logo.png'
    });

    fixture.thenErrorShouldBe(CompanyNotFoundError);
  });
});
