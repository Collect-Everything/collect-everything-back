import { AccessTokenController } from "./access-token.controller";
import { AccessTokenRouter } from "./access-token.router";
import { AccessTokenService } from "./access-token.service";

const accessTokenService = new AccessTokenService(process.env.JWT_SECRET!);

const accessTokenController = new AccessTokenController(accessTokenService);

const accessTokenRouter = new AccessTokenRouter(accessTokenController).router;

export { accessTokenRouter };
