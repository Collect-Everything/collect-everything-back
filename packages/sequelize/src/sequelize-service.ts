import { FindOptions, Model, ModelCtor, Order } from "sequelize";
import { FileService } from "@ce/files";
import { ICrudService, TListQuery } from "@ce/server-core";
import { ApiConfig, TObjectWithId } from "@ce/shared-core";
import _ from "lodash";

export abstract class SequelizeService<
  CreateFields extends object,
  Mdl extends TObjectWithId,
  SequelizeModel extends Model<Mdl, CreateFields>,
> implements ICrudService<CreateFields, Mdl, SequelizeModel>
{
  id: string;
  fileService: FileService | undefined;
  protected constructor(
    protected model: ModelCtor<SequelizeModel>,
    config: ApiConfig,
    protected modelFilesPath?: string[],
  ) {
    this.id = model.tableName;

    if (config.uploads) {
      this.fileService = new FileService(config.uploads, this.id);
    }
  }

  create(data: CreateFields) {
    return this.model.create(data as any);
  }

  get(itemId: number) {
    return this.model.findByPk(itemId);
  }

  list(query: TListQuery) {
    const options = this.queryToOptions(query);
    return this.model.findAll(options);
  }

  async update(itemId: number, data: Partial<Mdl>) {
    const item = await this.get(itemId);

    if (!item) {
      return null;
    }

    return item?.set(data).save();
  }

  count(query: TListQuery) {
    const options = this.queryToOptions(query);
    return this.model.count(options);
  }

  async delete(itemId: number) {
    const item = await this.get(itemId);
    if (!item) {
      throw new Error(
        "Service / " + this.model.tableName + " / " + itemId + " : NOT_FOUND",
      );
    }
    await this._checkFilesToDelete(item);
    await item.destroy();

    return item;
  }

  protected sortToOrder(sort: TListQuery["sort"]): Order {
    if (!sort) return [];
    return Object.entries(sort).map(([key, value]) => {
      let sortOrder: "ASC" | "DESC";
      if (value === 1) sortOrder = "ASC";
      else sortOrder = "DESC";
      return [key, sortOrder];
    });
  }

  protected queryToOptions(query: TListQuery): FindOptions {
    const options: FindOptions = {};

    if (query.filters) {
      options.where = query.filters;
    }

    if (query.limit) {
      options.limit = query.limit;
    }

    if (query.offset) {
      options.offset = query.offset;
    }

    if (query.sort) {
      options.order = this.sortToOrder(query.sort);
    }
    return options;
  }

  protected async executeUpdate(itemId: number, data: Partial<Mdl>) {
    const oldItem = await this.get(itemId);
    if (!oldItem) {
      throw new Error("Service / " + this.id + " / " + itemId + " : NOT_FOUND");
    }
    const newItem = await this.update(itemId, data);
    await this._checkFilesToDelete(oldItem, newItem);
    return newItem;
  }
  protected _checkFilesToDelete(oldItem: any, newItem?: any) {
    if (!this.modelFilesPath || !this.fileService) return;
    return Promise.all(
      this.modelFilesPath.map((dataPath) => {
        const oldFiles = this._getFilePaths(oldItem, dataPath.split("."));
        const newFiles = this._getFilePaths(newItem, dataPath.split("."));

        if (!oldFiles) return;

        if (Array.isArray(oldFiles)) {
          return Promise.all(
            oldFiles.map((filename) => {
              const skip = newFiles && newFiles.includes(filename);
              if (skip) return;

              return this.fileService?.delete(filename);
            }),
          );
        } else {
          if (oldFiles !== newFiles) {
            return this.fileService?.delete(oldFiles);
          }
        }
      }),
    );
  }

  protected _getFilePaths(item: any, path: string[]) {
    let files: string[] = [];
    const wildCardIndex = path.indexOf("*");
    if (wildCardIndex >= 0) {
      const basePath = path.slice(0, wildCardIndex);
      const nextPath = path.slice(wildCardIndex + 1);
      const baseObject = _.get(item, basePath.join("."));
      if (baseObject && baseObject.length > 0) {
        for (const element of baseObject) {
          files = files.concat(this._getFilePaths(element, nextPath));
        }
      }
    } else {
      const value = _.get(item, path.join("."));
      if (value && typeof value === "string") {
        files.push(value);
      }
    }
    return files;
  }
}
