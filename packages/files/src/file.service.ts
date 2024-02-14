import { AppConfig } from "@ce/shared-core";
import { FileServiceFactory } from "./file-service-factory";
import { bytesToMb } from "@ce/utils";

export interface IFileService {
  upload(file: File, basePath?: string): Promise<string>;
  delete(filename: string): Promise<void>;
}

export class FileService {
  service: IFileService;
  sizeLimit: number = 50 * 1024 * 1024; // 50MB
  source: AppConfig["api"]["uploads"]["source"];
  constructor(config: AppConfig["api"]["uploads"], resourceName: string) {
    this.service = FileServiceFactory.create(config, resourceName);
    this.source = config.source;

    if (config.sizeLimit) {
      this.sizeLimit = config.sizeLimit;
    }
  }

  async upload(files: File[]) {
    const skippedFiles = files.filter((file) => file.size > this.sizeLimit);
    const validFiles = files.filter((file) => file.size <= this.sizeLimit);

    const filenames = await Promise.all(
      validFiles.map((file) => {
        return this.service.upload(file).then((filename) => {
          return filename;
        });
      }),
    );
    return {
      uploadedFiles: filenames,
      failedFiles: skippedFiles.map((file) => {
        return {
          name: file.name,
          error: `${file.name} is too large (limit is ${bytesToMb(
            file.size,
          )}MB)`,
          reason: "File too large",
        };
      }),
    };
  }

  async delete(filename: string) {
    return this.service.delete(filename);
  }
}
