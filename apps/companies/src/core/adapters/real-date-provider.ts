import { DateProvider } from "@ce/shared-core";

export class RealDateProvider implements DateProvider {
  now() {
    return new Date();
  }
}
