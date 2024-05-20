import { EventsService } from "@ce/events";
import { BaseResponse, GatewayService } from "@ce/server-core";
import { CreateCompanyDTO } from "@ce/shared-core";
import { ConfigureStoreDTO } from "../../dtos/configure-store.dto";

export class CompaniesService extends GatewayService {
  constructor(private readonly eventsService: EventsService) {
    super("companies", {
      gatewayName: "SHOWCASE_GATEWAY",
      serviceName: "COMPANIES",
    });
  }

  async createCompany(data: CreateCompanyDTO) {
    const handler = this.fetcher.post<BaseResponse<{ companyId: string }>>(
      "/create",
      data,
    );

    return this.executeRequest(handler);
  }

  async configureStore(
    companyId: string,
    storeConfiguration: ConfigureStoreDTO,
  ) {
    const handler = this.fetcher.post<BaseResponse<{}>>(
      `/${companyId}/configure-store`,
      storeConfiguration,
    );
    return this.executeRequest(handler);
  }
}
