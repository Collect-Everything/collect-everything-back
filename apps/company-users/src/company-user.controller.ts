import { BaseController, ctrlWrapper } from "@ce/server-core";
import { RegisterUseCase } from "./core/use-cases/register/register.usecase";
import { RequestHandler } from "express";
import { RegisterCommand } from "./core/use-cases/register/register.command";
import { ApiResponse } from "@ce/shared-core";

export class CompanyUserController extends BaseController {
  constructor(private readonly registerUseCase: RegisterUseCase) {
    super("CompanyUser");
  }

  register: RequestHandler = async (req, res) =>
    ctrlWrapper("register", res, async () => {
      const body = req.body as RegisterCommand;

      await this.registerUseCase.execute(body);

      return {
        success: true,
        data: {},
      } satisfies ApiResponse;
    });
}
