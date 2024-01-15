export interface IFile {
  name: string;
  url: string;
  size: number;
  type: string;
}

export type ObjWithFiles<T> = T extends { [key: string]: IFile } ? T : never;

export class File implements IFile {
  name: string;
  url: string;
  size: number;
  type: string;
  constructor(options: {
    name: string;
    url: string;
    size: number;
    type: string;
  }) {
    this.name = options.name;
    this.url = options.url;
    this.size = options.size;
    this.type = options.type;
  }
}
export const isFile = (value: any): value is IFile => {
  return value instanceof File;
};
