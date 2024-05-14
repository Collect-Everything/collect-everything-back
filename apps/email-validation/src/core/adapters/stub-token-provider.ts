import { TokenProvider } from "../ports/token-provider";

export class StubTokenProvider implements TokenProvider {
  token = "stub-token";
  provide() {
    return this.token;
  }
}
