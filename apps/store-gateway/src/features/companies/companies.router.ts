import { CompaniesController } from './companies.controller';
import { BaseRouter } from '@ce/server-core';

export class CompaniesRouter extends BaseRouter {
  constructor(private readonly companiesCtrl: CompaniesController) {
    super();

    this.initRoutes();
  }

  initRoutes(): void {
    this.router.get('/:companyId', this.companiesCtrl.getCompany);
    this.router.get('/:companySlug/data', this.companiesCtrl.getCompanyData);
  }
}
