export function withoutUndefinedProperties<T extends object>(
  obj: T,
): Exclude<T, undefined> {
  const newObj = {} as Exclude<T, undefined>;

  for (const key in obj) {
    if (obj[key] !== undefined) {
      newObj[key] = obj[key];
    }
  }

  return newObj;
}
