import { ApiConfig } from "@ce/shared-core";
import { LocalUploadService } from "./local-upload.service";

export class FileServiceFactory {
  static create(config: ApiConfig["uploads"], resourceName: string) {
    if (!config) {
      throw new Error("Invalid file service config");
    }
    switch (config.source) {
      case "local":
        return new LocalUploadService(
          config.destination,
          config.staticUrl,
          resourceName,
        );
      default:
        throw new Error("Invalid file service type");
    }
  }
}
