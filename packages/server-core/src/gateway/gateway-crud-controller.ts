import { RequestHandler } from "express";
import { ctrlWrapper } from "../helpers";
import { CrudRoutes, crudApiRoutes } from "../crud/api";
import {
  GatewayController,
  GatewayControllerOptions,
} from "./gateway-controller";

export abstract class GatewayCrudController extends GatewayController {
  routes: CrudRoutes;
  constructor(
    options: GatewayControllerOptions,
    private name: string,
  ) {
    super(options);
    this.routes = crudApiRoutes();
  }

  create: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("create"), res, async () => {
      const { data } = await this.fetcher.post(this.routes.CREATE, req.body);
      return data;
    });

  list: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("list"), res, async () => {
      const query = req.query;
      const { data } = await this.fetcher.get(this.routes.LIST + "?" + query);
      return data;
    });

  get: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("get"), res, async () => {
      const { data } = await this.fetcher.get(
        this.routes.GET(req.params.itemId),
      );
      return data;
    });

  patch: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("patch"), res, async () => {
      const { data } = await this.fetcher.patch(
        this.routes.PATCH(req.params.itemId),
        req.body,
      );
      return data;
    });

  delete: RequestHandler = (req, res) =>
    ctrlWrapper(this.getIdentifier("delete"), res, async () => {
      const { data } = await this.fetcher.delete(
        this.routes.DELETE(req.params.itemId),
      );
      return data;
    });

  protected getIdentifier = (methodName: string) => {
    return `[GatewayCrudController] ${this.name}.${methodName}`;
  };
}
