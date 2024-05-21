import { EventsService } from "@ce/events";
import { CompanyUsersService } from "../company-users/company-users.service";
import { GatewayService } from "@ce/server-core";
import { Err } from "@ce/shared-core";

export class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid credentials");
  }
}
export class AuthService extends GatewayService {
  constructor(
    private readonly eventsService: EventsService,
    private readonly companyUsersService: CompanyUsersService,
  ) {
    super("auth", { gatewayName: "SHOWCASE_GATEWAY", serviceName: "AUTH" });
  }

  async login(email: string, password: string) {
    const validateResult = await this.companyUsersService.validateCredentials(
      email,
      password,
    );

    if (validateResult.isErr()) {
      return Err.of(new InvalidCredentialsError());
    }

    const userData = validateResult.value.data;
  }
}
