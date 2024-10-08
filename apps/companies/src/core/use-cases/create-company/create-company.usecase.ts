import { Err, IdProvider, Ok, Result } from '@ce/shared-core';
import { Company } from '../../domain/company.entity';
import { CompanyRepository } from '../../ports/company.repository';
import { CreateCompanyCommand } from './create-company.command';
import { CompanyAlreadyExistsError } from './create-company.errors';
import { DateProvider } from '../../ports/date-provider';

export class CreateCompanyUseCase {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly idProvider: IdProvider,
    private readonly dateProvider: DateProvider
  ) {}

  async execute(
    command: CreateCompanyCommand
  ): Promise<Result<{ companyId: string }, Error>> {
    const exists = await this.companyRepository.findByNameOrEmail(
      command.name,
      command.email
    );

    if (exists) {
      return Err.of(new CompanyAlreadyExistsError());
    }
    const company = Company.fromData({
      id: this.idProvider.generate(),
      ...command,
      subscriptionStatus: 'FREE_TRIAL',
      subscriptionUpdatedAt: this.dateProvider.now()
    });

    await this.companyRepository.save(company);

    return Ok.of({ companyId: company.id });
  }
}
