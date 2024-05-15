import { DateProvider } from "../ports/date-provider";

export class RealDateProvider implements DateProvider {
  getNow(): Date {
    return new Date();
  }
}
