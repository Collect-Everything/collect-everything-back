import { Entity, EntityValidationError } from "@ce/shared-core";
import z from "zod";

const EmailValidationPropsSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  callbackUrl: z.string(),
  token: z.string(),
  createdAt: z.date(),
});

export type EmailValidationProps = z.infer<typeof EmailValidationPropsSchema>;

export interface EmailValidationData {
  id: string;
  email: string;
  token: string;
  createdAt: Date;
  callbackUrl: string;
}

export const EMAIL_VALIDATION_EXPIRATION_TIME = 10 * 60 * 1000; // 10 minutes

export class EmailValidation extends Entity<EmailValidationProps, string> {
  constructor(props: EmailValidationProps) {
    super(props);
    this.validate();
  }

  get email() {
    return this._props.email;
  }

  get token() {
    return this._props.token;
  }

  get callbackUrl() {
    return this._props.callbackUrl;
  }

  get expiresAt(): Date {
    return new Date(
      this._props.createdAt.getTime() + EMAIL_VALIDATION_EXPIRATION_TIME,
    );
  }

  get data() {
    return {
      id: this._props.id,
      email: this._props.email,
      token: this._props.token,
      createdAt: this._props.createdAt,
      callbackUrl: this._props.callbackUrl,
    };
  }

  isExpired(now: Date): boolean {
    return now.getTime() > this.expiresAt.getTime();
  }

  isTokenValid(token: string): boolean {
    return this._props.token === token;
  }

  static create(props: EmailValidationProps): EmailValidation {
    return new EmailValidation({
      id: props.id,
      email: props.email,
      callbackUrl: props.callbackUrl,
      token: props.token,
      createdAt: props.createdAt,
    });
  }

  private validate() {
    const result = EmailValidationPropsSchema.safeParse(this._props);
    if (!result.success) {
      console.log("result", JSON.stringify(result.error))
      throw new EntityValidationError(result.error.errors);
    }
  }
}
