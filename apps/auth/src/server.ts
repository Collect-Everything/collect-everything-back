import { env } from "./env";
import app from "./index";
import { logger } from "@ce/logger";

const port = env.port || 3001;

app.listen(port, async () => {
  logger.info(`App is running: http://localhost:${port}`);
});
