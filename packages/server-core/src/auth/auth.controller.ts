import { RequestHandler } from "express";
import { IAuthService } from "./auth.interface";
import { ctrlWrapper, parseBody } from "../helpers";
import { ZodSchema } from "zod";
import { ApiResponse } from "@ce/shared-core";

export class AuthController {
  constructor(
    private props: {
      name: string;
      service: IAuthService;
      loginSchema: ZodSchema;
      registerSchema: ZodSchema;
      refreshTokenSchema: ZodSchema;
    },
  ) {}

  login: RequestHandler = (req, res, next) => {
    return ctrlWrapper(this.getIdentifier("login"), res, async () => {
      const parsedBody = parseBody(req, this.props.loginSchema);

      const data = await this.props.service.login(parsedBody);
      return {
        success: true,
        data,
      } satisfies ApiResponse;
    });
  };

  register: RequestHandler = (req, res, next) => {
    return ctrlWrapper(this.getIdentifier("register"), res, async () => {
      const parsedBody = parseBody(req, this.props.registerSchema);
      const data = await this.props.service.register(parsedBody);
      return {
        success: true,
        data,
      } satisfies ApiResponse;
    });
  };

  refreshToken: RequestHandler = (req, res, next) => {
    return ctrlWrapper(this.getIdentifier("refreshToken"), res, async () => {
      const parsedBody = parseBody(req, this.props.refreshTokenSchema);
      const data = await this.props.service.refreshToken(parsedBody);
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
