import { ICrudController, ICrudService, ListQuery, Req } from "../types";
import { errorBuilder } from "../errors/error-builder";
import { ApiResponse } from "@ce/shared-core";
import { ZodSchema } from "zod";
import { ctrlWrapper, parseBody } from "../helpers/controller";
import { RequestHandler, Response } from "express";

type CrudControllerConfig<TModelBase extends Object, TModel extends Object> = {
  name: string;
  service: ICrudService<TModelBase, TModel>;
  baseSchema: ZodSchema<TModelBase>;
  schema: ZodSchema<TModel>;
};

export abstract class CrudController<
  TModelBase extends Object,
  TModel extends Object,
> implements ICrudController<TModel>
{
  protected readonly name: string = "";
  protected readonly service: ICrudService<TModelBase, TModel>;
  protected readonly schema: ZodSchema<TModel>;
  protected readonly baseSchema: ZodSchema<TModelBase>;

  protected constructor(config: CrudControllerConfig<TModelBase, TModel>) {
    this.name = config.name;
    this.service = config.service;

    this.baseSchema = config.baseSchema;
    this.schema = config.schema;
  }

  list: RequestHandler = (req: Req, res: Response) => {
    return ctrlWrapper(this.name + ".list", res, async () => {
      const query = req.query;
      const parsedQuery = ListQuery.parse(query);
      const items = await this.service.list(parsedQuery);
      const reformattedItems: TModel[] = [];
      for (const item of items) {
        const reformattedItem = await this.reformatItem(req, item);
        reformattedItems.push(reformattedItem);
      }
      return {
        success: true,
        data: {
          items: reformattedItems,
          count: await this.service.count(parsedQuery),
        },
      } satisfies ApiResponse;
    });
  };

  get: RequestHandler = (req, res) =>
    ctrlWrapper(this.name + ".get", res, async () => {
      const itemId = req.params?.itemId;
      if (!itemId) {
        throw errorBuilder.invalidParameters("Id is required");
      }
      const item = await this.service.get(itemId);
      if (!item) {
        throw errorBuilder.notFound("Item not found");
      }
      const reformattedItem = await this.reformatItem(req, item);
      return {
        success: true,
        data: reformattedItem,
      } satisfies ApiResponse;
    });

  delete: RequestHandler = (req, res) =>
    ctrlWrapper(this.name + ".delete", res, async () => {
      const itemId = req.params?.itemId;
      if (!itemId) {
        throw errorBuilder.invalidParameters("Id is required");
      }
      return {
        success: true,
        data: await this.service.delete(itemId),
      } satisfies ApiResponse;
    });

  create: RequestHandler = (req, res) =>
    ctrlWrapper(this.name + ".create", res, async () => {
      const parsedBody = parseBody(req, this.baseSchema);

      const item = await this.service.create(parsedBody);

      return {
        success: true,
        data: item,
      } satisfies ApiResponse;
    });

  patch: RequestHandler = (req, res) =>
    ctrlWrapper(this.name + "patch", res, async () => {
      const itemId = req.params?.itemId;
      if (!itemId) {
        throw errorBuilder.invalidParameters("Id is required");
      }

      //TODO: Trouver un moyen de faire ça sans passer par any
      const parsedBody = parseBody(req, (this.schema as any).partial());
      const item = await this.service.update(
        itemId,
        parsedBody as Partial<TModel>,
      );

      return {
        success: true,
        data: item,
      } satisfies ApiResponse;
    });

  // protected async reformatItem(_req: Req, item: TModel): Promise<TModel>;
  // protected async reformatItem<T>(_req: Req, item: TModel): Promise<T>;
  protected async reformatItem(_req: Req, item: TModel): Promise<any> {
    return item;
  }
}
