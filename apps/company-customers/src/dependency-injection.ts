import { CompanyCustomerController } from './company-customer.controller';
import { CompanyCustomerRouter } from './company-customer.router';
import { PrismaCompanyCustomerRepository } from './core/adapters/company-customer.prisma.repository';
import { RealIDProvider } from './core/adapters/real-id-provider';
import { RealPasswordHasher } from './core/adapters/real-password-hasher';
import { DeleteUseCase } from './core/use-cases/delete/delete.usecase';
import { RegisterUseCase } from './core/use-cases/register/register.usecase';
import { UpdateUseCase } from './core/use-cases/update/update.usecase';
import { ValidateCredentialsUseCase } from './core/use-cases/validate-credentials/validate-credentials.usecase';
import { ValidateEmailUseCase } from './core/use-cases/validate-email/validate-email.usecase';
import { client } from './lib/db';

const idProvider = new RealIDProvider();
const passwordHasher = new RealPasswordHasher();

const companyUserRepository = new PrismaCompanyCustomerRepository(client);

const registerUseCase = new RegisterUseCase(
  companyUserRepository,
  idProvider,
  passwordHasher
);

const validateEmailUseCase = new ValidateEmailUseCase(companyUserRepository);

const validateCredentialsUseCase = new ValidateCredentialsUseCase(
  companyUserRepository,
  passwordHasher
);

const updateUseCase = new UpdateUseCase(companyUserRepository);
const deleteUseCase = new DeleteUseCase(companyUserRepository);

const companyCustomerController = new CompanyCustomerController(
  registerUseCase,
  validateEmailUseCase,
  validateCredentialsUseCase,
  updateUseCase,
  deleteUseCase
);

const companyCustomerRouter = new CompanyCustomerRouter(
  companyCustomerController
).router;

export { companyCustomerRouter };
