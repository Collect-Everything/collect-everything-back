import { CollectEverythingDB, getCompanyModel } from "@ce/db";
import { logger } from "@ce/logger";

export const db = new CollectEverythingDB(logger);

export const companyModel = getCompanyModel(db.sequelize);
