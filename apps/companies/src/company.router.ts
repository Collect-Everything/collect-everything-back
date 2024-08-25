import { BaseRouter } from '@ce/server-core';
import { CompanyController } from './company.controller';

export class CompanyRouter extends BaseRouter {
  constructor(private controller: CompanyController) {
    super();

    this.initRoutes();
  }

  initRoutes(): void {
    this.router.post('/create', [], this.controller.createCompany);
    this.router.post(
      '/:companyId/configure-store',
      [],
      this.controller.configureStore
    );
    this.router.get('/:companyId', [], this.controller.getCompany);
    this.router.get('/', [], this.controller.listCompanies);
    this.router.get(
      '/:companyId/store-configuration/',
      [],
      this.controller.getStoreConfiguration
    );
    this.router.delete('/:companyId', [], this.controller.deleteCompany);
  }
}
