import z from "zod";

const EnvSchema = z.object({
  port: z.coerce.number().default(3001),
  nodeEnv: z
    .enum(["development", "test", "production", "staging"])
    .default("development"),
  dbPort: z.coerce.number().default(3306),
  dbHost: z.string().default("localhost"),
  dbUser: z.string().default("root"),
  dbPassword: z.string().default("password"),
  dbName: z.string().default("ce_users"),
  jwtSecret: z.string().default("secret"),
});

const ENV_MAP = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  dbPort: process.env.DB_PORT,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  jwtSecret: process.env.JWT_SECRET,
};

export const env = EnvSchema.parse(ENV_MAP);
