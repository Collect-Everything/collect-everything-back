import { eventsService } from "./events";
import { AuthController } from "./features/auth/auth.controller";
import { AuthRouter } from "./features/auth/auth.router";
import { AuthService } from "./features/auth/auth.service";
import { CompaniesController } from "./features/companies/companies.controller";
import { CompaniesRouter } from "./features/companies/companies.router";
import { CompaniesService } from "./features/companies/companies.service";

const companiesService = new CompaniesService(eventsService);
const authService = new AuthService(eventsService);

const companiesCtrl = new CompaniesController(companiesService);
const authCtrl = new AuthController(authService);

const companiesRouter = new CompaniesRouter(companiesCtrl).router;
const authRouter = new AuthRouter(authCtrl).router;

export { companiesService, companiesRouter, authRouter };
