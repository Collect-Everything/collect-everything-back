import { EventsService, ServerEvent } from "@ce/events";
import { BaseResponse, GatewayService } from "@ce/server-core";
import { PaginatedParams } from "@ce/shared-core";

export class CompanyCustomersService extends GatewayService {
  constructor(private readonly eventsService: EventsService) {
    super("companyCustomers", {
      gatewayName: "ADMIN_GATEWAY",
      serviceName: "COMPANY_CUSTOMERS",
    });
  }

  async getCompanyCustomer(companyCustomerId: string) {
    const handler = this.fetcher.get<BaseResponse<{}>>(`/${companyCustomerId}`);
    return this.executeRequest(handler);
  }

  async listCompanyCustomers(query: PaginatedParams) {
    const handler = this.fetcher.get<BaseResponse<{}>>(
      `?page=${query.page}&limit=${query.limit}`,
    );

    return this.executeRequest(handler);
  }
}
