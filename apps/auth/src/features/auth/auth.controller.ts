import { RequestHandler } from "express";
import { ApiResponse, LoginDTO, RefreshTokenDTO } from "@ce/shared-core";
import { IAuthService, ctrlWrapper, parseBody } from "@ce/server-core";

export class AuthController {
  constructor(
    private props: {
      name: string;
      service: IAuthService;
    },
  ) {}

  login: RequestHandler = (req, res) => {
    return ctrlWrapper(this.getIdentifier("login"), res, async () => {
      const parsedBody = parseBody(req, LoginDTO);

      const data = await this.props.service.login(parsedBody);
      return {
        success: true,
        data,
      } satisfies ApiResponse;
    });
  };

  refreshToken: RequestHandler = (req, res) => {
    return ctrlWrapper(this.getIdentifier("refreshToken"), res, async () => {
      const parsedBody = parseBody(req, RefreshTokenDTO);
      const data = await this.props.service.refreshToken(parsedBody.token);
      return {
        success: true,
        data,
      } satisfies ApiResponse;
    });
  };

  private getIdentifier = (methodName: string) => {
    return `[AuthController] ${this.props.name}.${methodName}`;
  };
}
