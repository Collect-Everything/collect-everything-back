import express, { RequestHandler } from "express";
import { AuthController } from "./auth.controller";

type AuthRouterOptions = {
  controller: AuthController;
  middlewares?: {
    login?: RequestHandler[];
    register?: RequestHandler[];
    refreshToken?: RequestHandler[];
  };
};

export class AuthRouter {
  router = express.Router();
  constructor(options: AuthRouterOptions) {
    const { controller, middlewares } = options;
    this.router.post("/login", middlewares?.login || [], controller.login);
    this.router.post(
      "/register",
      middlewares?.register || [],
      controller.register,
    );
    this.router.post(
      "/refresh",
      middlewares?.refreshToken || [],
      controller.refreshToken,
    );
  }
}
