import { describe, test, beforeEach } from 'vitest';
import {
  CompanyUserFixture,
  createCompanyCustomerFixture
} from '../_fixtures/company-customer.fixture';
import { CompanyCustomer } from '../../domain/company-customer.entity';
import { EmailAlreadyVerifiedError } from './validate-email.errors';
import { CompanyCustomerNotFoundError } from '../../errors/company-customer-not-found';

describe('Validate email', () => {
  let fixture: CompanyUserFixture;

  beforeEach(() => {
    fixture = createCompanyCustomerFixture();
  });

  test('the user exists and his email is not validated yet, it should validate the email', async () => {
    fixture.givenSomeCompanyCustomers([
      CompanyCustomer.fromData({
        id: 'id-1',
        email: 'johndoe@gmail.com',
        password: 'hashed-Qwert123',
        firstname: 'John',
        lastname: 'Doe',
        companyId: '1',
        emailVerified: false
      })
    ]);

    await fixture.whenValidatingEmail({ email: 'johndoe@gmail.com' });

    await fixture.thenCompanyUserShouldBeValidated('id-1');
  });

  test('the user does not exist, it should throw an error', async () => {
    await fixture.whenValidatingEmail({ email: 'johndoe@gmail.com' });

    fixture.thenErrorShouldBe(CompanyCustomerNotFoundError);
  });

  test('the user exists but his email is already validated, it should throw an error', async () => {
    fixture.givenSomeCompanyCustomers([
      CompanyCustomer.fromData({
        id: 'id-1',
        email: 'johndoe@gmail.com',
        password: 'hashed-Qwert123',
        firstname: 'John',
        lastname: 'Doe',
        companyId: '1',
        emailVerified: true
      })
    ]);

    await fixture.whenValidatingEmail({ email: 'johndoe@gmail.com' });

    fixture.thenErrorShouldBe(EmailAlreadyVerifiedError);
  });
});
