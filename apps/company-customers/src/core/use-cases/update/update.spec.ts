import { describe, test, beforeEach } from 'vitest';
import {
  CompanyUserFixture,
  createCompanyCustomerFixture
} from '../_fixtures/company-customer.fixture';
import { CompanyCustomer } from '../../domain/company-customer.entity';
import { CompanyCustomerNotFoundError } from '../../errors/company-customer-not-found';

describe('Update company user', () => {
  let fixture: CompanyUserFixture;

  beforeEach(() => {
    fixture = createCompanyCustomerFixture();
  });

  test('informations are correct, it should update the company user', async () => {
    fixture.givenSomeCompanyCustomers([
      CompanyCustomer.fromData({
        id: 'id-1',
        email: 'john.doe@gmail.com',
        password: 'super-strong-password',
        firstname: 'John',
        lastname: 'Doe',
        companyId: '1'
      })
    ]);

    await fixture.whenUpdatingCompanyCustomer({
      id: 'id-1'
    });

    await fixture.thenCompanyUserShouldBe(
      CompanyCustomer.fromData({
        id: 'id-1',
        email: 'john.doe@gmail.com',
        password: 'super-strong-password',
        firstname: 'John',
        lastname: 'Doe',
        companyId: '1'
      })
    );
  });

  test('the user does not exist, it should throw an error', async () => {
    fixture.givenSomeCompanyCustomers([]);

    await fixture.whenUpdatingCompanyCustomer({
      id: 'id-1'
    });

    fixture.thenErrorShouldBe(CompanyCustomerNotFoundError);
  });
});
