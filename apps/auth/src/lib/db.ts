import { CollectEverythingDB, getCompanyUserModel } from "@ce/db";
import { logger } from "@ce/logger";

export const db = new CollectEverythingDB(logger);

export const companyUserModel = getCompanyUserModel(db.sequelize);
