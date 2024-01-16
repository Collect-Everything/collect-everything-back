import { MakeNullishOptional } from "sequelize/types/utils";
import {
  Attributes,
  DestroyOptions,
  FindOptions,
  Identifier,
  Model,
  ModelCtor,
  UpdateOptions,
} from "sequelize";
import { TObjWithId } from "../types/object";
import { isFile } from "../lib/files/file.types";
import { FileService } from "../lib/files/file.service";

export abstract class CrudService<TModel extends Model<TObjWithId, any>> {
  protected constructor(
    protected model: ModelCtor<TModel>,
    protected modelFilesPath?: string[],
    protected fileService?: FileService,
  ) {}

  create(data: MakeNullishOptional<TModel>) {
    return this.model.create(data);
  }

  get(options: FindOptions) {
    return this.model.findOne(options);
  }

  getById(id: Identifier) {
    return this.model.findByPk(id);
  }

  list(options?: FindOptions) {
    return this.model.findAll(options);
  }

  count(options?: FindOptions) {
    return this.model.count(options);
  }

  async createOrUpdate(
    itemId: string,
    data: { [key in keyof Attributes<TModel>] },
  ) {
    const item = await this.getById(itemId);
    if (item) {
      return this.update(data, { where: { id: itemId } });
    }
    return this.create(data as MakeNullishOptional<TModel>);
  }

  update(
    values: { [key in keyof Attributes<TModel>]: any },
    options: UpdateOptions,
  ) {
    return this.model.update(values, options);
  }

  async delete(options: DestroyOptions) {
    const deletedItem = await this.model.destroy(options);
    this.handleFileChange(deletedItem, undefined);
    return deletedItem;
  }

  handleFileChange(oldItem: any, newItem: any) {
    if (!this.modelFilesPath || !this.fileService) return;
    this.modelFilesPath.forEach((path) => {
      const oldFile = oldItem?.[path];
      const newFile = newItem?.[path];
      if (!isFile(oldFile) && !isFile(newFile)) {
        return;
      } else if (isFile(oldFile) && !isFile(newFile)) {
        this.fileService?.delete(oldFile.name);
      } else if (isFile(newFile) && isFile(oldFile)) {
        if (oldFile.name !== newFile.name) {
          this.fileService?.delete(oldFile.name);
        }
      }
    });
  }
}
