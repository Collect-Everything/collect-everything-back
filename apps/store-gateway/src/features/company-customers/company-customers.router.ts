import { BaseRouter } from '@ce/server-core';
import { CompanyCustomersController } from './company-customers.controller';

export class CompanyCustomersRouter extends BaseRouter {
  constructor(
    private readonly companyCustomersCtrl: CompanyCustomersController
  ) {
    super();
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.post(
      '/register',
      [],
      this.companyCustomersCtrl.registerCompanyCustomer
    );
  }
}
