import { IDProvider } from "../ports/id-provider";
import { v4 as uuidV4 } from "uuid";

export class RealIDProvider implements IDProvider {
  provide(): string {
    return uuidV4();
  }
}
