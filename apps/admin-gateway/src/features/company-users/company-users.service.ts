import { EventsService, ServerEvent } from "@ce/events";
import { BaseResponse, GatewayService } from "@ce/server-core";
import { PaginatedParams } from "@ce/shared-core";

export class CompanyUsersService extends GatewayService {
  constructor(private readonly eventsService: EventsService) {
    super("companyUsers", {
      gatewayName: "ADMIN_GATEWAY",
      serviceName: "COMPANY_USERS",
    });
  }

  async getCompanyUser(companyUserId: string) {
    const handler = this.fetcher.get<BaseResponse<{}>>(`/${companyUserId}`);
    return this.executeRequest(handler);
  }

  async listCompanyUsers(query: PaginatedParams) {
    const handler = this.fetcher.get<BaseResponse<{}>>(
      `?page=${query.page}&limit=${query.limit}`,
    );

    return this.executeRequest(handler);
  }
}
