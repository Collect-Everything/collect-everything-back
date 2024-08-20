import { Err, Ok, Result } from '@ce/shared-core';
import { RegisterCommand } from './register.command';
import { CompanyCustomerRepository } from '../../ports/company-customer.repository';
import { IdProvider } from '../../ports/id-provider';
import { CompanyCustomer } from '../../domain/company-customer.entity';
import { PasswordHasher } from '../../ports/password-hasher';
import { EmailAlreadyTakenError } from './register.errors';

export class RegisterUseCase {
  constructor(
    private readonly companyUserRepository: CompanyCustomerRepository,
    private readonly idProvider: IdProvider,
    private readonly passwordHasher: PasswordHasher
  ) {}

  async execute(command: RegisterCommand): Promise<Result<void, any>> {
    try {
      const exists = await this.companyUserRepository.findByEmail(
        command.email
      );

      if (exists) {
        return Err.of(new EmailAlreadyTakenError());
      }

      const companyUser = CompanyCustomer.fromData({
        id: this.idProvider.generate(),
        email: command.email,
        password: await this.passwordHasher.hash(command.password),
        firstname: command.firstname,
        lastname: command.lastname,
        companyId: command.companyId
      });

      await this.companyUserRepository.save(companyUser);

      return Ok.of(undefined);
    } catch (error) {
      return Err.of(error);
    }
  }
}
