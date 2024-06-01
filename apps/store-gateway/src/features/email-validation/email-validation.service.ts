import { EventsService, ServerEvent } from "@ce/events";
import { BaseResponse, GatewayService } from "@ce/server-core";
import { EMAIL_VERIFIED_EVENT } from "../../events/handlers/email-validation.events-handler";

export class EmailValidationService extends GatewayService {
  constructor(private readonly eventsService: EventsService) {
    super("emailValidation", {
      gatewayName: "STORE_GATEWAY",
      serviceName: "EMAIL_VALIDATION",
    });
  }

  async sendValidationEmail(email: string) {
    const handler = this.fetcher.post("/send-validation-email", { email });
    return this.executeRequest(handler);
  }

  async checkValidationToken(token: string) {
    const result = await this.executeRequest(
      this.fetcher.get<BaseResponse<{ isValid: boolean; email?: string }>>(
        `/check-validation-token/${token}`,
      ),
    );

    if (result.isOk() && result.value.data.isValid) {
      this.eventsService.send(
        ServerEvent.create({
          type: EMAIL_VERIFIED_EVENT,
          payload: { email: result.value.data.email },
        }),
      );
    } else {
    }

    return result;
  }
}
