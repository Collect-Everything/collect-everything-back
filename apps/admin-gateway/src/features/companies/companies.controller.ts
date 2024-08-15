import {
  BaseResponse,
  GatewayController,
  HttpException,
  ctrlWrapper,
  parseBody,
} from "@ce/server-core";
import { RequestHandler } from "express";
import { CompaniesService } from "./companies.service";

export class CompaniesController extends GatewayController {
  constructor(
    private readonly companiesService: CompaniesService,
  ) {
    super("companies");
  }
}
