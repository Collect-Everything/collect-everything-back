import { EventsService } from "@ce/events";
import { GatewayService } from "@ce/server-core";
import { ApiResponse, CreateCompanyDTO } from "@ce/shared-core";

export class CompaniesService extends GatewayService {
  constructor(private readonly eventsService: EventsService) {
    super("companies", {
      gatewayName: "SHOWCASE_GATEWAY",
      serviceName: "COMPANIES",
    });
  }

  async createCompany(data: CreateCompanyDTO) {
    const res = await this.fetcher.post<ApiResponse<{ companyId: string }>>(
      "/create",
      data,
    );

    return res.data.data.companyId;
  }
}
