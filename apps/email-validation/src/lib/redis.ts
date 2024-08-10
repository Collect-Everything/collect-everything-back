import { createClient } from "redis";
import { env } from "../env";

export const redisClient = createClient({
  password: env.redisPass,
  socket: {
    host: "127.0.0.1",
    port: env.redisPort,
  },
});
