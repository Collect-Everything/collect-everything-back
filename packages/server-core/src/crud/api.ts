export type CrudRoutes = {
  LIST: string;
  GET: (itemId: string) => string;
  CREATE: string;
  PATCH: (itemId: string) => string;
  DELETE: (itemId: string) => string;
};

export const crudApiRoutes: () => CrudRoutes = () => {
  return {
    LIST: "/",
    GET: (itemId: string) => `/${itemId}`,
    CREATE: "/",
    PATCH: (itemId: string) => `/${itemId}`,
    DELETE: (itemId: string) => `/${itemId}`,
  };
};
