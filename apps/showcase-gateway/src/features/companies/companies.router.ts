import { upload } from '../../lib/multer';
import { CompaniesController } from './companies.controller';
import { BaseRouter } from '@ce/server-core';

export class CompaniesRouter extends BaseRouter {
  constructor(private readonly companiesCtrl: CompaniesController) {
    super();

    this.initRoutes();
  }

  initRoutes(): void {
    this.router.post('/create', this.companiesCtrl.createCompanyAndAdmin);
    this.router.post(
      '/:companyId/configure-store',
      upload.fields([
        { name: 'logo', maxCount: 1 },
        { name: 'image', maxCount: 1 }
      ]),
      this.companiesCtrl.configureStore
    );
  }
}
