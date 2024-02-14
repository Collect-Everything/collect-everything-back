import z from "zod";

export const DatabaseConfig = z.object({
  port: z.coerce.number(),
  host: z.string(),
  username: z.string(),
  password: z.string(),
  database: z.string(),
});

export const getConfigFromEnv = () => {
  const map = {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  };

  return DatabaseConfig.parse(map);
};
