import { adminsCtrl } from "./admins.controller";
import express from "express";

const adminsRouter = express.Router();

adminsRouter.get("/", [], adminsCtrl.listAdmins);
adminsRouter.post("/login", [], adminsCtrl.login);
adminsRouter.post("/refresh", [], adminsCtrl.refreshToken);

export { adminsRouter };
