import { isFile } from "@/features/file";
import _ from "lodash";

export const reformatObjectWithFiles = <T extends object>(
  obj: T,
  filesKeys: string[],
) => {
  return filesKeys.reduce((acc, key) => {
    const value = _.get(obj, key);
    if (value && isFile(value)) {
      _.set(acc, key, value.url);
    }
    return acc;
  }, obj);
};

export const reformatObjectsWithFiles = <T extends object>(
  objs: T[],
  filesKeys: string[],
) => {
  return objs.map((obj) => reformatObjectWithFiles(obj, filesKeys));
};
