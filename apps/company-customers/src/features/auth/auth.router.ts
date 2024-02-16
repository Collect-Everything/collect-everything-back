import { AuthRouter } from "@ce/server-core";
import { authController } from "./auth.controller";

export const authRouter = new AuthRouter({ controller: authController }).router;
