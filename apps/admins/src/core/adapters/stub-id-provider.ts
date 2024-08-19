import { IdProvider } from "../ports/id-provider";

export class StubIdProvider implements IdProvider {
  id = "stub-id";
  generate() {
    return this.id;
  }
}
