import { companyUsersCtrl } from "./company-users.controller";
import express from "express";

const companyUsersRouter = express.Router();

companyUsersRouter.post("/login", [], companyUsersCtrl.login);
companyUsersRouter.post("/register", [], companyUsersCtrl.register);
companyUsersRouter.post("/refresh", [], companyUsersCtrl.refreshToken);

export { companyUsersRouter };
