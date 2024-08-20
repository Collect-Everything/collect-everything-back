import { BaseRouter } from '@ce/server-core';
import { AuthController } from './auth.controller';

export class AuthRouter extends BaseRouter {
  constructor(private readonly controller: AuthController) {
    super();

    this.initRoutes();
  }

  initRoutes() {
    this.router.post('/login', this.controller.login);
    this.router.post(
      '/login-with-refresh-token',
      this.controller.loginWithRefreshToken
    );
  }
}
