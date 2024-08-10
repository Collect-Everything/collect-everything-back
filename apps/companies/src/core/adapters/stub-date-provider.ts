import { DateProvider } from "../ports/date-provider";

export class StubDateProvider implements DateProvider {
  date = new Date("2024-01-01");
  now() {
    return this.date;
  }
}
