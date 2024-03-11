import express from "express";
import { companiesCtrl } from "./companies.controller";
import { isLogged } from "@ce/server-core";

const companiesRouter = express.Router();
companiesRouter.get("/", [], companiesCtrl.getlistCompanies);
companiesRouter.get("/:id", [], companiesCtrl.getOneCompany);
companiesRouter.post("/", [isLogged], companiesCtrl.createCompany);
companiesRouter.patch("/:id", [isLogged], companiesCtrl.updateCompany);

export { companiesRouter };
