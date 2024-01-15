import { NextFunction, Request, RequestHandler, Response } from "express";
import { Sort } from "../types/mongoose";
import { matchedData, validationResult } from "express-validator";
import { ERRORS_KEYS, errorsBuilders } from "./error-builder";
import { buildQueryFromFilters } from "./filters";
import { errorHandler } from "../middlewares/errors";
import { CrudService } from "./crud-service";
import { Identifier, Model } from "sequelize";
import { TObjWithId } from "../types/object";
import pino from "pino";

export async function genericCtrlFn<T>(
  res: Response,
  _next: NextFunction,
  logger: pino.Logger,
  serviceCallFn: () => Promise<T>,
) {
  try {
    let response: T = await serviceCallFn();
    res.status(200).send(response);
  } catch (error) {
    errorHandler(error, res, logger);
  }
}

export async function withValidators<T = Record<string, any>>(
  req: Request,
  res: Response,
  _next: NextFunction,
  logger: pino.Logger,
  serviceCallFn: (data: T) => Promise<any> | any,
) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send({ errors: errors.array() });
      return;
    }

    const data = matchedData(req) as T;

    let response: any = await serviceCallFn(data);
    const status = response?.status ?? 200;
    res.status(status).send(response);
  } catch (error) {
    errorHandler(error, res, logger);
  }
}

function getJsonBody(req: Request): Promise<any> | any {
  return req.body;
}

export abstract class CrudController<TModel extends Model<TObjWithId, any>> {
  protected constructor(
    protected service: CrudService<TModel>,
    protected logger: pino.Logger,
  ) {}

  create: RequestHandler = async (req, res, next) => {
    return genericCtrlFn(res, next, this.logger, () => {
      const body = getJsonBody(req);
      return this.service.create(body);
    });
  };

  get: RequestHandler = async (req, res, next) => {
    return withValidators(req, res, next, this.logger, async (data) => {
      const item = await this.service.get(data.id);
      if (!item) {
        throw errorsBuilders(ERRORS_KEYS.global.notFound);
      }

      return item;
    });
  };

  count: RequestHandler = (req, res, next) => {
    return withValidators(req, res, next, this.logger, async (data) => {
      const { query } = this.handleListQueries(data);

      return { result: (await this.service.count(query)) ?? 0 };
    });
  };

  list: RequestHandler = async (req, res, next) => {
    return withValidators(req, res, next, this.logger, async (data) => {
      const { query, offset, limit, sort } = this.handleListQueries(data);

      const items = await this.service.list({ where: query, offset, limit });

      const count = await this.service.count();

      return { items, count };
    });
  };

  update: RequestHandler = async (req, res, next) => {
    return withValidators<TModel & { id: Identifier }>(
      req,
      res,
      next,
      this.logger,
      async (data) => {
        //const item = await this.service.update(data.id, data);
        //if (!item) {
        //throw errorsBuilders(ERRORS_KEYS.global.notFound);
        //}

        return {};
      },
    );
  };

  delete: RequestHandler = async (req, res, next) => {
    return withValidators(req, res, next, this.logger, async (data) => {
      const item = await this.service.delete(data.id);
      if (!item) {
        throw errorsBuilders(ERRORS_KEYS.global.notFound);
      }

      return item;
    });
  };

  private handleListQueries = (data: Record<string, any>) => {
    let query = {};
    let offset: number | undefined;
    let limit: number | undefined;
    let sort: Sort | undefined;
    let filters: any[] = [];
    if (data.offset && typeof data.offset === "string")
      offset = parseInt(data.offset);
    if (data.limit && typeof data.limit === "string")
      limit = parseInt(data.limit);
    if (data.sort && typeof data.sort === "string") {
      sort = JSON.parse(data.sort);
    }

    if (data.filters && typeof data.filters === "string") {
      filters = JSON.parse(data.filters);
      query = buildQueryFromFilters(filters);
    }

    return { query, offset, limit, sort };
  };
}
