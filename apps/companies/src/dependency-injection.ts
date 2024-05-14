import { CompanyController } from "./company.controller";
import { CompanyRouter } from "./company.router";
import { InMemoryCompanyRepository } from "./core/adapters/company.in-memory.repository";
import { RealIDProvider } from "./core/adapters/real-id-provider";
import { ConfigureStoreUseCase } from "./core/use-cases/configure-store/configure-store.usecase";
import { CreateCompanyUseCase } from "./core/use-cases/create-company/create-company.usecase";

const companyRepository = new InMemoryCompanyRepository();

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
