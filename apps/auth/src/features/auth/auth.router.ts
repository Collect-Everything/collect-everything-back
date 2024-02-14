import express from "express";
import { authController } from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/login", [], authController.login);

authRouter.post("/register", [], authController.register);

authRouter.post("/refresh-token", [], authController.refreshToken);

export { authRouter };
