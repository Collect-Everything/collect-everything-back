import {
  BaseResponse,
  GatewayController,
  ctrlWrapper,
  parseBody
} from '@ce/server-core';
import { RequestHandler } from 'express';
import { CompaniesService } from './companies.service';
import { CompanyUsersService } from '../company-users/company-users.service';
import {
  CreateCompanyAndAdminDTO,
  CreateCompanyAndAdminDTOSchema
} from '../../dtos/create-company-and-admin.dto';
import { ConfigureStoreDTOSchema } from '../../dtos/configure-store.dto';
import { getFileUrl } from '../../lib/multer';

export class CompaniesController extends GatewayController {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly companyUsersService: CompanyUsersService
  ) {
    super('companies');
  }

  createCompanyAndAdmin: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('createCompany'), res, async () => {
      const body = parseBody<CreateCompanyAndAdminDTO>(
        req,
        CreateCompanyAndAdminDTOSchema
      );

      const createCompanyResult = await this.companiesService.createCompany(
        body.company
      );

      if (createCompanyResult.isErr()) {
        throw createCompanyResult.error;
      }

      const registerResult = await this.companyUsersService.register({
        ...body.admin,
        companyId: createCompanyResult.value.data.companyId,
        role: 'ADMIN'
      });

      if (registerResult.isErr()) {
        await this.companiesService.deleteCompany(
          createCompanyResult.value.data.companyId
        );
        throw registerResult.error;
      }

      return {
        status: 201,
        success: true,
        data: { companyId: createCompanyResult.value.data.companyId }
      } satisfies BaseResponse;
    });

  configureStore: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('configureStore'), res, async () => {
      const companyId = req.params.companyId;
      const storeConfiguration = parseBody(req, ConfigureStoreDTOSchema);
      const files = req.files as Record<string, Express.Multer.File[]>;
      const logoFile = files?.['logo']?.[0];
      const imageFile = files?.['image']?.[0];
      const configureStoreResult = await this.companiesService.configureStore(
        companyId,
        {
          ...storeConfiguration,
          logo: logoFile
            ? getFileUrl(logoFile.filename)
            : storeConfiguration.logo,
          image: imageFile
            ? getFileUrl(imageFile.filename)
            : storeConfiguration.image
        }
      );
      if (configureStoreResult.isErr()) {
        throw configureStoreResult.error;
      }
      return {
        success: true,
        data: {}
      } satisfies BaseResponse;
    });

  getStoreConfiguration: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier('getStoreConfiguration'), res, async () => {
      const companyId = req.params.companyId;
      const storeConfigurationResult =
        await this.companiesService.getStoreConfiguration(companyId);
      if (storeConfigurationResult.isErr()) {
        throw storeConfigurationResult.error;
      }
      return {
        success: true,
        data: storeConfigurationResult.value.data
      } satisfies BaseResponse;
    });
}
