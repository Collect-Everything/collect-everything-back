import { describe, test, beforeEach } from "vitest";
import {
  CompaniesFixture,
  createCompaniesFixture,
} from "../_fixtures/companies-fixture";
import { Company } from "../../domain/company.entity";
import { CompanyAlreadyExistsError } from "./create-company.errors";

describe("Create Company", () => {
  let fixture: CompaniesFixture;
  beforeEach(() => {
    fixture = createCompaniesFixture();
  });
  test("informations are correct, it should create a company", async () => {
    fixture.givenPredefinedID("id-1");
    fixture.givenNowIs(new Date("2024-08-10"));

    await fixture.whenUserCreatesCompany({
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

    await fixture.thenCompanyShouldBeCreated(
      Company.fromData({
        id: "id-1",
        name: "Company 1",
        phone: "123456789",
        email: "company@gmail.com",
        addressLabel: "123 Main St",
        street: "Main St",
        streetNumber: "123",
        postalCode: "12345",
        city: "City",
        country: "Country",
        subscriptionStatus: "FREE_TRIAL",
        subscriptionUpdatedAt: new Date("2024-08-10"),
      }),
    );
  });

  test("company name already exists, should throw error", async () => {
    await fixture.givenSomeCompanies([
      Company.fromData({
        id: "id-1",
        name: "Company 1",
        phone: "123456789",
        email: "company@gmail.com",
        addressLabel: "123 Main St",
        street: "Main St",
        streetNumber: "123",
        postalCode: "12345",
        city: "City",
        country: "Country",
        subscriptionStatus: "FREE_TRIAL",
        subscriptionUpdatedAt: new Date("2024-08-10"),
      }),
    ]);

    await fixture.whenUserCreatesCompany({
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

    fixture.thenErrorShouldBe(CompanyAlreadyExistsError);
  });
});
