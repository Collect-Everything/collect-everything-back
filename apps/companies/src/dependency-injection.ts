import { CompanyController } from "./company.controller";
import { CompanyRouter } from "./company.router";
import { PrismaCompanyRepository } from "./core/adapters/company.prisma.repository";
import { RealDateProvider } from "./core/adapters/real-date-provider";
import { RealIDProvider } from "./core/adapters/real-id-provider";
import { ConfigureStoreUseCase } from "./core/use-cases/configure-store/configure-store.usecase";
import { CreateCompanyUseCase } from "./core/use-cases/create-company/create-company.usecase";
import { GetCompanyUseCase } from "./core/use-cases/get-company/get-company.usecase";
import { ListCompaniesUseCase } from "./core/use-cases/list-companies/list-companies.usecase";
import { client } from "./lib/db";

const companyRepository = new PrismaCompanyRepository(client);

const IDProvider = new RealIDProvider();
const dateProvider = new RealDateProvider();

const createCompanyUseCase = new CreateCompanyUseCase(
  companyRepository,
  IDProvider,
  dateProvider,
);

const configureStoreUseCase = new ConfigureStoreUseCase(companyRepository);

const getCompanyUseCase = new GetCompanyUseCase(companyRepository);

const listCompaniesUseCase = new ListCompaniesUseCase(companyRepository);

const companyController = new CompanyController(
  createCompanyUseCase,
  configureStoreUseCase,
  getCompanyUseCase,
  listCompaniesUseCase,
);

const companyRouter = new CompanyRouter(companyController).router;

export { companyRouter };
