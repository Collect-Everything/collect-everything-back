import { IdProvider } from "../id-provider";

export class StubIdProvider implements IdProvider {
  id = "stub-id";
  generate(): string {
    return this.id;
  }
}
