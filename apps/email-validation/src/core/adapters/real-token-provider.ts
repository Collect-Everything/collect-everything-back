import { generateRandomString } from "@ce/shared-core";
import { TokenProvider } from "../ports/token-provider";

export class RealTokenProvider implements TokenProvider {
  provide(): string {
    return generateRandomString(32);
  }
}
