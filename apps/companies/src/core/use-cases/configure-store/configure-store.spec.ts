import { describe, test, beforeEach } from "vitest";
import {
  CompaniesFixture,
  createCompaniesFixture,
} from "../_fixtures/companies-fixture";
import { Company } from "../../domain/company.entity";
import {
  DEFAULT_STORE_COLOR,
  DEFAULT_STORE_LOGO,
} from "../../domain/store-configuration.vo";
import { StoreNameAlreadyExistsError } from "./configure-store.errors";

const testCompanyData = {
  id: "1",
  name: "Company 1",
  phone: "123456789",
  email: "company@gmail.com",
  addressLabel: "123 Main St",
  street: "Main St",
  streetNumber: "123",
  postalCode: "12345",
  city: "City",
  country: "Country",
};

describe("Configure Store", () => {
  let fixture: CompaniesFixture;

  beforeEach(async () => {
    fixture = createCompaniesFixture();

    await fixture.givenSomeCompanies([Company.fromData(testCompanyData)]);
  });

  test("All informations are correct, it should save the configuration", async () => {
    await fixture.whenUserConfiguresStore({
      companyId: 1,
      storeName: "Store 1",
      color: "#FFFFFF",
      logo: "/logo.png",
    });

    const expectedCompany = Company.fromData({
      id: "1",
      name: "Company 1",
      phone: "123456789",
      email: "company@gmail.com",
      addressLabel: "123 Main St",
      street: "Main St",
      streetNumber: "123",
      postalCode: "12345",
      city: "City",
      country: "Country",
    });

    expectedCompany.configureStore({
      storeName: "Store 1",
      color: "#FFFFFF",
      logo: "/logo.png",
    });

    await fixture.thenStoreShouldBeConfigured(expectedCompany);
  });

  test("The color is not provided, it should save the configuration with the default color", async () => {
    await fixture.whenUserConfiguresStore({
      companyId: 1,
      storeName: "Store 1",
      logo: "/logo.png",
    });

    const expectedCompany = Company.fromData({
      id: "1",
      name: "Company 1",
      phone: "123456789",
      email: "company@gmail.com",
      addressLabel: "123 Main St",
      street: "Main St",
      streetNumber: "123",
      postalCode: "12345",
      city: "City",
      country: "Country",
    });

    expectedCompany.configureStore({
      storeName: "Store 1",
      color: DEFAULT_STORE_COLOR,
      logo: "/logo.png",
    });

    await fixture.thenStoreShouldBeConfigured(expectedCompany);
  });

  test("The logo is not provided, it should save the configuration with the default logo", async () => {
    await fixture.whenUserConfiguresStore({
      companyId: 1,
      storeName: "Store 1",
    });

    const expectedCompany = Company.fromData({
      id: "1",
      name: "Company 1",
      phone: "123456789",
      email: "company@gmail.com",
      addressLabel: "123 Main St",
      street: "Main St",
      streetNumber: "123",
      postalCode: "12345",
      city: "City",
      country: "Country",
    });

    expectedCompany.configureStore({
      storeName: "Store 1",
      color: DEFAULT_STORE_COLOR,
      logo: DEFAULT_STORE_LOGO,
    });

    await fixture.thenStoreShouldBeConfigured(expectedCompany);
  });

  test("The store name is already used, it should throw an error", async () => {
    await fixture.givenSomeCompanies([
      Company.fromData({
        id: "2",
        name: "Company 2",
        phone: "123456789",
        email: "company-2@gmail.com",
        addressLabel: "123 Main St",
        street: "Main St",
        streetNumber: "123",
        postalCode: "12345",
        city: "City",
        country: "Country",
        storeConfiguration: {
          storeName: "Store 1",
          color: "#FFFFFF",
          logo: "/logo.png",
        },
      }),
    ]);

    await fixture.whenUserConfiguresStore({
      companyId: 1,
      storeName: "Store 1",
      color: "#FFFFFF",
      logo: "/logo.png",
    });

    fixture.thenErrorShouldBe(StoreNameAlreadyExistsError);
  });
});
