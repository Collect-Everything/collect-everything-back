import { EventsService } from '@ce/events';
import { BaseResponse, GatewayService } from '@ce/server-core';

export class CompaniesService extends GatewayService {
  constructor(private readonly eventsService: EventsService) {
    super('companies', {
      gatewayName: 'STORE_GATEWAY',
      serviceName: 'COMPANIES'
    });
  }

  async getCompany(companyId: string) {
    console.log('companyId', companyId);
    const handler = this.fetcher.get<BaseResponse>(`/company/${companyId}`);
    return this.executeRequest(handler);
  }

  async getStoreConfiguration(companyId: string) {
    const handler = this.fetcher.get<BaseResponse<{}>>(
      `/${companyId}/store-configuration`
    );
    return this.executeRequest(handler);
  }

  async getBySlug(companySlug: string) {
    const handler = this.fetcher.get<BaseResponse>(`/slug/${companySlug}`);
    return this.executeRequest(handler);
  }
}
