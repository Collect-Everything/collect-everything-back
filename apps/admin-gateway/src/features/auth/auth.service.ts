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
      gatewayName: "ADMIN_GATEWAY",
      serviceName: "AUTH",
    });
  }
}
