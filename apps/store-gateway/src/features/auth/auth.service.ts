import { EventsService } from '@ce/events';
import { BaseResponse, GatewayService } from '@ce/server-core';
import { CompanyCustomerTokenPayloadSchema, Err, Ok } from '@ce/shared-core';
import { CompanyCustomersService } from '../company-customers/company-customers.service';

export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid credentials');
  }
}

export class InvalidTokenPayloadError extends Error {
  constructor() {
    super('Invalid token payload');
  }
}

export class AuthService extends GatewayService {
  constructor(
    private readonly eventsService: EventsService,
    private readonly companyCustomersService: CompanyCustomersService
  ) {
    super('auth', {
      gatewayName: 'STORE_GATEWAY',
      serviceName: 'AUTH'
    });
  }

  async login(email: string, password: string) {
    const validateResult =
      await this.companyCustomersService.validateCredentials(email, password);
    if (validateResult.isErr()) {
      return Err.of(new InvalidCredentialsError());
    }

    const customerData = validateResult.value.data;

    if (!customerData.emailVerified) {
      return Err.of(new Error('Email not verified'));
    }

    const tokenResult = await this.generateToken(customerData);

    if (tokenResult.isErr()) {
      return Err.of(new Error('Failed to generate token'));
    }

    return Ok.of({
      accessToken: tokenResult.value.data.accessToken,
      refreshToken: tokenResult.value.data.refreshToken
    });
  }

  async loginWithRefreshToken(refreshToken: string) {
    const payloadResult = await this.verifyToken(refreshToken);

    if (payloadResult.isErr()) {
      return payloadResult;
    }

    const customerData = payloadResult.value;

    const tokenResult = await this.generateToken(customerData);

    if (tokenResult.isErr()) {
      return Err.of(new Error('Failed to generate token'));
    }

    return Ok.of({
      accessToken: tokenResult.value.data.accessToken,
      refreshToken: tokenResult.value.data.refreshToken
    });
  }

  private async verifyToken(token: string) {
    const handler = this.fetcher.post<BaseResponse<{ payload: any }>>(
      '/verify',
      { token }
    );

    const result = await this.executeRequest(handler);

    if (result.isErr()) {
      return result;
    }

    const payloadResult = CompanyCustomerTokenPayloadSchema.safeParse(
      result.value.data.payload
    );

    if (payloadResult.success) {
      return Ok.of(payloadResult.data);
    }

    return Err.of(new InvalidTokenPayloadError());
  }

  private async generateToken(payload: any) {
    const handler = this.fetcher.post<
      BaseResponse<{ accessToken: string; refreshToken: string }>
    >('/create', payload);

    return this.executeRequest(handler);
  }
}
