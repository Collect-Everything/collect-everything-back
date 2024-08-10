import { DateProvider } from "../date-provider";

export class StubDateProvider implements DateProvider {
  date = new Date();
  now(): Date {
    return this.date;
  }
}
