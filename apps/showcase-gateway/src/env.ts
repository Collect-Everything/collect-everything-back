import z from "zod";

const EnvSchema = z.object({
  servicesHost: z.string().default("localhost"),
  gatewaysHost: z.string().default("localhost"),
  nodeEnv: z
    .enum(["development", "test", "production", "staging"])
    .default("development"),
  dbPort: z.coerce.number().default(3306),
  dbHost: z.string().default("localhost"),
  dbUser: z.string().default("root"),
  dbPassword: z.string().default("password"),
  dbName: z.string().default("ce_users"),
});

const ENV_MAP = {
  servicesHost: process.env.SERVICES_HOST,
  gatewaysHost: process.env.GATEWAYS_HOST,
  nodeEnv: process.env.NODE_ENV,
  dbPort: process.env.DB_PORT,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
};

export const env = EnvSchema.parse(ENV_MAP);
