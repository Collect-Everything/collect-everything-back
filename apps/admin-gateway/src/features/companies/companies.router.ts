import express from "express";
import { companiesCtrl } from "./companies.controller";
import { isLogged } from "@ce/server-core";

const companiesRouter = express.Router();
companiesRouter.get("/", [isLogged], companiesCtrl.getlistCompanies);
companiesRouter.get("/:id", [isLogged], companiesCtrl.getOneCompany);
companiesRouter.post("/", [], companiesCtrl.createCompany);
companiesRouter.patch("/:id", [isLogged], companiesCtrl.updateCompany);
companiesRouter.delete("/:id", [isLogged], companiesCtrl.deleteCompany);

export { companiesRouter };
