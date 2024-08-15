import { EventsService, ServerEvent } from "@ce/events";
import { BaseResponse, GatewayService } from "@ce/server-core";

export class AdminUsersService extends GatewayService {
  constructor(private readonly eventsService: EventsService) {
    super("adminUsers", {
      gatewayName: "ADMIN_GATEWAY",
      serviceName: "ADMIN_USERS",
    });
  }

  async validateCredentials(email: string, password: string) {
    const handler = this.fetcher.post<
      BaseResponse<{
        id: string;
        email: string;
        firstname: string;
        lastname: string;
      }>
    >("/validate-credentials", {
      email,
      password,
    });
    return this.executeRequest(handler);
  }
}
