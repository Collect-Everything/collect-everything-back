import { FileHelper } from "./file-helper";
import { Readable } from "stream";
import fs from "fs";
import { removeWhitespace } from "@ce/utils";
import { IFileService } from "./file.service";
import path from "path";

export class LocalUploadService implements IFileService {
  baseDestinationPath: string;
  constructor(
    baseDestinationPath: string,
    private readonly staticUrl: string,
    private readonly resourceName: string,
  ) {
    this.baseDestinationPath = baseDestinationPath;
  }
  async upload(file: File) {
    FileHelper.checkExtension(file.name);
    const buffer = await FileHelper.getBuffer(file);
    const stream = Readable.from(buffer);

    const folderPath = `${this.baseDestinationPath}/${this.resourceName}`;
    const formattedFilename = FileHelper.formatFilename(file.name);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const finalPath = removeWhitespace(
      path.join(folderPath, formattedFilename),
    );
    const outStream = fs.createWriteStream(finalPath);

    stream.pipe(outStream);
    return `${this.staticUrl}/${this.resourceName}/${formattedFilename}`;
  }

  async delete(filePath: string) {
    const fileName = filePath.substring(this.staticUrl.length);
    const fullPath = path.join(this.baseDestinationPath, fileName);
    fs.unlink(fullPath, (err) => {
      if (err) {
        throw new Error(
          `[LocalUploadService]: Failed to delete file: ${fullPath}`,
        );
      }
    });
  }
}
