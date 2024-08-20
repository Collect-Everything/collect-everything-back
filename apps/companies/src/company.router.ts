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
      'store-configuration/:storeSlug',
      [],
      this.controller.getStoreConfiguration
    );
  }
}
