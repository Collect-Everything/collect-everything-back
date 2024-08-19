import { EventsService, ServerEvent } from "@ce/events";
import { BaseResponse, GatewayService } from "@ce/server-core";
import { CreateAdminDto, Err } from "@ce/shared-core";
import { InvalidCredentialsError } from "../auth/auth.service";

export class AdminUsersService extends GatewayService {
  constructor(private readonly eventsService: EventsService) {
    super("adminUsers", {
      gatewayName: "ADMIN_GATEWAY",
      serviceName: "ADMINS",
    });
  }

  async register(data: CreateAdminDto) {
    const res = await this.executeRequest(this.fetcher.post("/register", data));
    if (res.isErr()) {
      return Err.of(new InvalidCredentialsError());
    }
    return res;
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
