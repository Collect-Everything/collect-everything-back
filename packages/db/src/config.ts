import z from "zod";

export const DatabaseConfig = z.object({
  port: z.coerce.number().default(3306),
  host: z.string().default("localhost"),
  username: z.string().default("root"),
  password: z.string().default("password"),
  database: z.string().default("ce_users"),
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
