import express, { RequestHandler } from "express";
import { CrudController } from "./crud-controller";
import { param, query } from "express-validator";
import { Model } from "sequelize";
import { TObjWithId } from "../types/object";

export abstract class CrudRouter<TModel extends Model<TObjWithId, any>> {
  readonly router: express.Router;

  protected constructor(
    protected readonly controller: CrudController<TModel>,
    middlewares: {
      list?: RequestHandler[];
      get?: RequestHandler[];
      count?: RequestHandler[];
      create?: RequestHandler[];
      update?: RequestHandler[];
      delete?: RequestHandler[];
    },
  ) {
    this.router = express.Router({ mergeParams: true });
    this.addRoutesBeforeCrud();
    this.router.get(
      "/",
      [
        ...(middlewares.list || [adminMiddleware]),
        query("offset").optional().isString(),
        query("limit").optional().isString(),
        query("sort").optional().isString(),
        query("filters").optional().isString(),
      ],
      controller.list,
    );
    this.router.get(
      "/count",
      [
        ...(middlewares.count || [adminMiddleware]),
        query("filters").optional().isString(),
      ],
      controller.count,
    );
    this.router.get(
      "/:id",
      ...(middlewares.get || [adminMiddleware]),
      param("id").notEmpty().escape(),
      controller.get,
    );
    this.router.post(
      "/",
      ...(middlewares.create || [adminMiddleware]),
      controller.create,
    );
    this.router.patch(
      "/:id",
      ...(middlewares.update || [adminMiddleware]),
      param("id").notEmpty().escape(),
      controller.update,
    );
    this.router.delete(
      "/:id",
      ...(middlewares.delete || [adminMiddleware]),
      param("id").notEmpty().escape(),
      controller.delete,
    );
  }

  protected addRoutesBeforeCrud() {}
}
