import { EventsService } from "@ce/events";
import { BaseResponse, GatewayService } from "@ce/server-core";
import { CompanyUserTokenPayloadSchema, Err, Ok } from "@ce/shared-core";

export class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid credentials");
  }
}

export class InvalidTokenPayloadError extends Error {
  constructor() {
    super("Invalid token payload");
  }
}

export class AuthService extends GatewayService {
  constructor(private readonly eventsService: EventsService) {
    super("auth", {
      gatewayName: "STORE_GATEWAY",
      serviceName: "AUTH",
    });
  }

  async login(email: string, password: string) {
    //TODO: Remplacer par l'appel au service company-customer
    //const validateResult = await this.companyUsersService.validateCredentials(
    //  email,
    //  password,
    //);
    //if (validateResult.isErr()) {
    //  return Err.of(new InvalidCredentialsError());
    //}
    //
    //const userData = validateResult.value.data;

    const tokenResult = await this.generateToken({});

    if (tokenResult.isErr()) {
      return Err.of(new Error("Failed to generate token"));
    }

    return Ok.of({
      accessToken: tokenResult.value.data.accessToken,
      refreshToken: tokenResult.value.data.refreshToken,
    });
  }

  async loginWithRefreshToken(refreshToken: string) {
    const payloadResult = await this.verifyToken(refreshToken);

    if (payloadResult.isErr()) {
      return payloadResult;
    }

    const userData = payloadResult.value;

    const tokenResult = await this.generateToken(userData);

    if (tokenResult.isErr()) {
      return Err.of(new Error("Failed to generate token"));
    }

    return Ok.of({
      accessToken: tokenResult.value.data.accessToken,
      refreshToken: tokenResult.value.data.refreshToken,
    });
  }

  private async verifyToken(token: string) {
    const handler = this.fetcher.post<BaseResponse<{ payload: any }>>(
      "/verify",
      { token },
    );

    const result = await this.executeRequest(handler);

    if (result.isErr()) {
      return result;
    }

    //TODO: Remplacer par le schema pour un company-customer
    const payloadResult = CompanyUserTokenPayloadSchema.safeParse(
      result.value.data.payload,
    );

    if (payloadResult.success) {
      return Ok.of(payloadResult.data);
    }

    return Err.of(new InvalidTokenPayloadError());
  }

  private async generateToken(payload: any) {
    const handler = this.fetcher.post<
      BaseResponse<{ accessToken: string; refreshToken: string }>
    >("/create", payload);

    return this.executeRequest(handler);
  }
}
