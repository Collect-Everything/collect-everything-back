import { describe, test, beforeEach } from 'vitest';
import { CompanyCustomer } from '../../domain/company-customer.entity';
import {
  CompanyUserFixture,
  createCompanyCustomerFixture
} from '../_fixtures/company-customer.fixture';
import { EntityValidationError } from '@ce/shared-core';
import { EmailAlreadyTakenError } from './register.errors';

describe('Create company user', () => {
  let fixture: CompanyUserFixture;

  beforeEach(() => {
    fixture = createCompanyCustomerFixture();
  });

  test('informations are correct, it should create the company user', async () => {
    fixture.givenPredefinedId('id-1');

    await fixture.whenRegisteringCompanyCustomer({
      email: 'johndoe@gmail.com',
      password: 'Qwert123',
      firstname: 'John',
      lastname: 'Doe',
      companyId: '1'
    });

    await fixture.thenCompanyUserShouldBe(
      CompanyCustomer.fromData({
        id: 'id-1',
        email: 'johndoe@gmail.com',
        password: 'hashed-Qwert123',
        firstname: 'John',
        lastname: 'Doe',
        companyId: '1'
      })
    );
  });

  test('email is invalid, it should throw an error', async () => {
    fixture.givenPredefinedId('id-1');

    await fixture.whenRegisteringCompanyCustomer({
      email: 'johndoe.com',
      password: 'Qwert123',
      firstname: 'John',
      lastname: 'Doe',
      companyId: '1'
    });

    fixture.thenErrorShouldBe(EntityValidationError);
  });

  test('user with the same email already exists, it should throw an error', async () => {
    fixture.givenPredefinedId('id-1');

    fixture.givenSomeCompanyCustomers([
      CompanyCustomer.fromData({
        id: 'id-1',
        email: 'johndoe@gmail.com',
        password: 'hashed-Qwert123',
        firstname: 'John',
        lastname: 'Doe',
        companyId: '1'
      })
    ]);

    await fixture.whenRegisteringCompanyCustomer({
      email: 'johndoe@gmail.com',
      password: 'Qwert123',
      firstname: 'John',
      lastname: 'Doe',
      companyId: '1'
    });

    fixture.thenErrorShouldBe(EmailAlreadyTakenError);
  });
});
