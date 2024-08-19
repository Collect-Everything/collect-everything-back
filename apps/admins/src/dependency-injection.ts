import { AdminController } from "./admins.controller";
import { AdminRouter } from "./admins.router";
import { PrismaAdminRepository } from "./core/adapters/admin.prisma.repository";
import { RealIDProvider } from "./core/adapters/real-id-provider";
import { RealPasswordHasher } from "./core/adapters/real-password-hasher";
import { RegisterUseCase } from "./core/use-cases/register/register.usecase";
import { ValidateCredentialsUseCase } from "./core/use-cases/validate-credentials/validate-credentials.usecase";
import { client } from "./lib/db";

const idProvider = new RealIDProvider();
const passwordHasher = new RealPasswordHasher();

const adminRepository = new PrismaAdminRepository(client);

const registerUseCase = new RegisterUseCase(
  adminRepository,
  idProvider,
  passwordHasher,
);

const validateCredentialsUseCase = new ValidateCredentialsUseCase(
  adminRepository,
  passwordHasher,
);

const adminController = new AdminController(
  validateCredentialsUseCase,
  registerUseCase,
);

const adminRouter = new AdminRouter(adminController).router;

export { adminRouter };
