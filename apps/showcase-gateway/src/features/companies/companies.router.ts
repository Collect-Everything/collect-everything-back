import express from "express";
import { companiesCtrl } from "./companies.controller";

const companiesRouter = express.Router();
companiesRouter.post("/create", companiesCtrl.createCompany);

export { companiesRouter };
