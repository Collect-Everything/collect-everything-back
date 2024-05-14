import { DateProvider } from "../ports/date-provider";

export class StubDateProvider implements DateProvider {
  now = new Date("2021-01-01T00:00:00Z");

  getNow(): Date {
    return this.now;
  }
}
