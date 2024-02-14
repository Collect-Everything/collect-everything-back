import { Sequelize } from "sequelize";
import { getConfigFromEnv } from "./config";
import pino from "pino";

export class CollectEverythingDB {
  sequelize: Sequelize;
  private MAX_RETRIES = 5;
  private DELAY = 5000;
  private retries = 0;
  constructor(private logger: pino.Logger) {
    const config = getConfigFromEnv();
    this.sequelize = new Sequelize({
      dialect: "mysql",
      ...config,
    });
  }
  connectWithRetry = async () => {
    try {
      this.sequelize.authenticate();
      this.logger.info(
        "[SEQUELIZE]: Connection has been established successfully.",
      );
    } catch (error) {
      this.logger.error("[SEQUELIZE]: Unable to connect to the database:");
      if (this.retries < this.MAX_RETRIES) {
        this.logger.info(`[SEQUELIZE]: Retrying in 5 seconds...`);
        setTimeout(this.connectWithRetry, this.DELAY);
        this.retries++;
      }
    }
  };
}
