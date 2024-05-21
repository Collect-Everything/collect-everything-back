import { EventsService, ServerEvent } from "@ce/events";
import { BaseResponse, GatewayService } from "@ce/server-core";
import { CreateCompanyUserDTO } from "@ce/shared-core";
import { COMPANY_USER_CREATED } from "../../events/handlers/company-users.events-handler";

export class CompanyUsersService extends GatewayService {
  constructor(private readonly eventsService: EventsService) {
    super("companyUsers", {
      gatewayName: "SHOWCASE_GATEWAY",
      serviceName: "COMPANY_USERS",
    });
  }

  async register(data: CreateCompanyUserDTO) {
    const res = await this.executeRequest(this.fetcher.post("/register", data));

    if (res.isOk()) {
      this.eventsService.send(
        ServerEvent.create({
          type: COMPANY_USER_CREATED,
          payload: { email: data.email },
        }),
      );
    }

    return res;
  }

  async validateEmail(email: string) {
    const handler = this.fetcher.post("/validate-email", { email });
    return this.executeRequest(handler);
  }

  async validateCredentials(email: string, password: string) {
    const handler = this.fetcher.post<
      BaseResponse<{
        id: string;
        email: string;
        firstname: string;
        lastname: string;
        role: string;
        companyId: string;
      }>
    >("/validate-credentials", {
      email,
      password,
    });
    return this.executeRequest(handler);
  }
}
