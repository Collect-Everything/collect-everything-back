import { EventsService } from "@ce/events";
import { BaseResponse, GatewayService } from "@ce/server-core";
import { PaginatedParams } from "@ce/shared-core";

export class CompaniesService extends GatewayService {
  constructor(private readonly eventsService: EventsService) {
    super("companies", {
      gatewayName: "ADMIN_GATEWAY",
      serviceName: "COMPANIES",
    });
  }

  async getCompany(companyId: string) {
    const handler = this.fetcher.get<BaseResponse<{}>>(`/${companyId}`);
    return this.executeRequest(handler);
  }

  async listCompanies(query: PaginatedParams) {
    const handler = this.fetcher.get<BaseResponse<{}>>(
      `?page=${query.page}&limit=${query.limit}`,
    );

    return this.executeRequest(handler);
  }
}
