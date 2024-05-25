import { AccessTokenController } from "./access-token.controller";
import { AccessTokenRouter } from "./access-token.router";
import { AccessTokenService } from "./access-token.service";

//TODO: Mettre un vrai secret depuis les variables d'environnement
const accessTokenService = new AccessTokenService("super-secret");

const accessTokenController = new AccessTokenController(accessTokenService);

const accessTokenRouter = new AccessTokenRouter(accessTokenController).router;

export { accessTokenRouter };
