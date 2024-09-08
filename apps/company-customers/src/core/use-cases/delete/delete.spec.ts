import { describe, test, beforeEach } from 'vitest';
import {
  CompanyUserFixture,
  createCompanyCustomerFixture
} from '../_fixtures/company-customer.fixture';
import { CompanyCustomer } from '../../domain/company-customer.entity';
import { CompanyCustomerNotFoundError } from '../../errors/company-customer-not-found';

describe('Delete company user', () => {
  let fixture: CompanyUserFixture;

  beforeEach(() => {
    fixture = createCompanyCustomerFixture();
  });

  test('the user exists, it should delete the user', async () => {
    fixture.givenSomeCompanyCustomers([
      CompanyCustomer.fromData({
        id: 'id-1',
        email: 'john.doe@gmail.com',
        firstname: 'John',
        lastname: 'Doe',
        password: 'super-strong-password',
        companyId: '1'
      })
    ]);

    await fixture.whenDeletingCompanyCustomer({ id: 'id-1' });

    fixture.thenCompanyUserShouldBeDeleted('id-1');
  });

  test('the user does not exist, it should throw an error', async () => {
    fixture.givenSomeCompanyCustomers([]);

    await fixture.whenDeletingCompanyCustomer({ id: 'id-1' });

    fixture.thenErrorShouldBe(CompanyCustomerNotFoundError);
  });

  test('the user is admin but there are other admins, it should delete the user', async () => {
    fixture.givenSomeCompanyCustomers([
      CompanyCustomer.fromData({
        id: 'id-1',
        email: 'john.doe@gmail.com',
        firstname: 'John',
        lastname: 'Doe',
        password: 'super-strong-password',
        companyId: '1'
      }),
      CompanyCustomer.fromData({
        id: 'id-2',
        email: 'dwayne.johnson@gmail.com',
        firstname: 'Dwayne',
        lastname: 'Johnson',
        password: 'super-strong-password',
        companyId: '1'
      })
    ]);

    await fixture.whenDeletingCompanyCustomer({ id: 'id-1' });

    fixture.thenCompanyUserShouldBeDeleted('id-1');
  });
});
