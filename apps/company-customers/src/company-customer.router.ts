import { BaseRouter } from '@ce/server-core';
import { CompanyCustomerController } from './company-customer.controller';

export class CompanyCustomerRouter extends BaseRouter {
  constructor(private readonly controller: CompanyCustomerController) {
    super();

    this.initRoutes();
  }

  initRoutes() {
    this.router.get('/:companyCustomerId', [], this.controller.getCompanyCustomer);
    this.router.get('/', [], this.controller.listCompanyCustomers);

    this.router.post('/register', this.controller.register);

    this.router.post('/validate-email', this.controller.validateEmail);

    this.router.post(
      '/validate-credentials',
      this.controller.validateCredentials
    );

    this.router.patch('/:id', this.controller.update);
    this.router.delete('/:id', this.controller.delete);
  }
}
