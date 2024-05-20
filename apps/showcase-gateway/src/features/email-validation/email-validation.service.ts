import { GatewayService } from "@ce/server-core";

export class EmailValidationService extends GatewayService {
  constructor() {
    super("emailValidation", {
      gatewayName: "SHOWCASE_GATEWAY",
      serviceName: "EMAIL_VALIDATION",
    });
  }

  async sendValidationEmail(email: string) {
    const handler = this.fetcher.post("/send-validation-email", { email });
    return this.executeRequest(handler);
  }

  async checkValidationToken(token: string) {
    const handler = this.fetcher.post("/check-validation-token", { token });
    return this.executeRequest(handler);
  }
}
