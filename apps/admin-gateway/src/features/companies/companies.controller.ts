import {
  BaseResponse,
  GatewayController,
  HttpException,
  ctrlWrapper,
} from "@ce/server-core";
import { RequestHandler } from "express";
import { CompaniesService } from "./companies.service";

export class CompaniesController extends GatewayController {
  constructor(private readonly companiesService: CompaniesService) {
    super("companies");
  }

  listCompanies: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("listCompanies"), res, async () => {
      const listCompaniesResult = await this.companiesService.listCompanies({
        page: parseInt(req.query.page as string),
        limit: parseInt(req.query.limit as string),
      });
      if (listCompaniesResult.isErr()) {
        throw new HttpException(400, listCompaniesResult.error.message);
      }
      return {
        status: 200,
        success: true,
        data: listCompaniesResult.value.data,
      } satisfies BaseResponse;
    });
}
