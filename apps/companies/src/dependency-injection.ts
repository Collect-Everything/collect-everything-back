import { CompanyController } from "./company.controller";
import { CompanyRouter } from "./company.router";
import { PrismaCompanyRepository } from "./core/adapters/company.prisma.repository";
import { RealIDProvider } from "./core/adapters/real-id-provider";
import { ConfigureStoreUseCase } from "./core/use-cases/configure-store/configure-store.usecase";
import { CreateCompanyUseCase } from "./core/use-cases/create-company/create-company.usecase";
import { client } from "./lib/db";

const companyRepository = new PrismaCompanyRepository(client);

const IDProvider = new RealIDProvider();

const createCompanyUseCase = new CreateCompanyUseCase(
  companyRepository,
  IDProvider,
);

const configureStoreUseCase = new ConfigureStoreUseCase(companyRepository);

const companyController = new CompanyController(
  createCompanyUseCase,
  configureStoreUseCase,
);

const companyRouter = new CompanyRouter(companyController).router;

export { companyRouter };
