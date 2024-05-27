import { createClient } from "redis";
import { env } from "../env";

export const redisClient = createClient({
  password: env.redisPass,
  socket: {
    host: "redis",
    port: env.redisPort,
  },
});
