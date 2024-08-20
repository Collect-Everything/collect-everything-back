import { describe, test, beforeEach } from 'vitest';
import {
  CompanyUserFixture,
  createCompanyCustomerFixture
} from '../_fixtures/company-customer.fixture';
import { CompanyCustomer } from '../../domain/company-customer.entity';
import { InvalidCredentialsError } from './valide-credentials.errors';

describe('Validate credentials', () => {
  let fixture: CompanyUserFixture;

  beforeEach(() => {
    fixture = createCompanyCustomerFixture();
  });

  test('the user exists and the credentials are valid, it should return the user', async () => {
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

    await fixture.whenValidatingCredentials({
      email: 'johndoe@gmail.com',
      password: 'Qwert123'
    });

    fixture.thenShouldReturnUser({
      id: 'id-1',
      email: 'johndoe@gmail.com',
      firstname: 'John',
      lastname: 'Doe',
      companyId: '1'
    });
  });

  test('the user does not exist, it should throw an error', async () => {
    await fixture.whenValidatingCredentials({
      email: 'johndoe@gmail.com',
      password: 'Qwert123'
    });

    fixture.thenErrorShouldBe(InvalidCredentialsError);
  });

  test('the user exist but the password does not correspond, it should throw an error', async () => {
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

    await fixture.whenValidatingCredentials({
      email: 'johndoe@gmail.com',
      password: 'Qwert1234'
    });

    fixture.thenErrorShouldBe(InvalidCredentialsError);
  });
});
