import express from "express";
import { companyUsersCtrl } from "./company-users.controller";
import { isLogged } from "@ce/server-core";

const companyUsersRouter = express.Router();
companyUsersRouter.get("/", [isLogged], companyUsersCtrl.getlistCompanyUsers);
companyUsersRouter.get("/:id", [isLogged], companyUsersCtrl.getOneCompanyUser);
companyUsersRouter.post("/", [], companyUsersCtrl.createCompanyUser);
companyUsersRouter.patch(
  "/:id",
  [isLogged],
  companyUsersCtrl.updateCompanyUser
);
companyUsersRouter.delete(
  "/:id",
  [isLogged],
  companyUsersCtrl.deleteCompanyUser
);

export { companyUsersRouter };
