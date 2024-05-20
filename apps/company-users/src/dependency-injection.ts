import { CompanyUserController } from "./company-user.controller";
import { CompanyUserRouter } from "./company-user.router";
import { PrismaCompanyUserRepository } from "./core/adapters/company-user.prisma.repository";
import { RealIDProvider } from "./core/adapters/real-id-provider";
import { RealPasswordHasher } from "./core/adapters/real-password-hasher";
import { RegisterUseCase } from "./core/use-cases/register/register.usecase";
import { ValidateCredentialsUseCase } from "./core/use-cases/validate-credentials/validate-credentials.usecase";
import { ValidateEmailUseCase } from "./core/use-cases/validate-email/validate-email.usecase";
import { client } from "./lib/db";

const idProvider = new RealIDProvider();
const passwordHasher = new RealPasswordHasher();

const companyUserRepository = new PrismaCompanyUserRepository(client);

const registerUseCase = new RegisterUseCase(
  companyUserRepository,
  idProvider,
  passwordHasher,
);

const validateEmailUseCase = new ValidateEmailUseCase(companyUserRepository);

const validateCredentialsUseCase = new ValidateCredentialsUseCase(
  companyUserRepository,
  passwordHasher,
);

const companyUserController = new CompanyUserController(
  registerUseCase,
  validateEmailUseCase,
  validateCredentialsUseCase,
);

const companyUserRouter = new CompanyUserRouter(companyUserController).router;

export { companyUserRouter };
