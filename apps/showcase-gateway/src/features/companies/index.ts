import { eventsService } from "../../lib/events";
import { CompaniesController } from "./companies.controller";
import { CompaniesRouter } from "./companies.router";
import { CompaniesService } from "./companies.service";

const companiesService = new CompaniesService(eventsService);

const companiesCtrl = new CompaniesController(companiesService);

const companiesRouter = new CompaniesRouter(companiesCtrl).router;

export { companiesRouter };
