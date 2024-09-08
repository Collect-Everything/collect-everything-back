import { EventsService } from '@ce/events';
import { CompanyUsersService } from '../company-users/company-users.service';
import {
  BaseResponse,
  GatewayService,
  ServiceCallError
} from '@ce/server-core';
import { CompanyUserTokenPayloadSchema, Err, Ok } from '@ce/shared-core';

export class AuthService extends GatewayService {
  constructor(
    private readonly eventsService: EventsService,
    private readonly companyUsersService: CompanyUsersService
  ) {
    super('auth', {
      gatewayName: 'SHOWCASE_GATEWAY',
      serviceName: 'AUTH'
    });
  }

  async login(email: string, password: string) {
    const validateResult = await this.companyUsersService.validateCredentials(
      email,
      password
    );

    if (validateResult.isErr()) {
      return validateResult;
    }

    const userData = validateResult.value.data;

    if (!userData.emailVerified) {
      throw new Error('Email not verified');
    }

    const tokenResult = await this.generateToken(userData);

    if (tokenResult.isErr()) {
      return tokenResult;
    }

    return Ok.of({
      payload: userData,
      accessToken: tokenResult.value.data.accessToken,
      refreshToken: tokenResult.value.data.refreshToken
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
      return tokenResult;
    }

    return Ok.of({
      payload: userData,
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

    const payloadResult = CompanyUserTokenPayloadSchema.safeParse(
      result.value.data.payload
    );

    if (payloadResult.success) {
      return Ok.of(payloadResult.data);
    }

    return Err.of(
      new ServiceCallError(400, 'Invalid token payload', 'AUTH_ERROR')
    );
  }

  private async generateToken(payload: any) {
    const handler = this.fetcher.post<
      BaseResponse<{ accessToken: string; refreshToken: string }>
    >('/create', payload);

    return this.executeRequest(handler);
  }
}
