import z from "zod";

const EnvSchema = z.object({
  port: z.coerce.number().default(3001),
  nodeEnv: z
    .enum(["development", "test", "production", "staging"])
    .default("development"),
});

const ENV_MAP = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
};

export const env = EnvSchema.parse(ENV_MAP);
