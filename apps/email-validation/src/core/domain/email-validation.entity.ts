import {
  Entity,
  EntityValidationError,
  Err,
  Ok,
  Result,
} from "@ce/shared-core";
import z from "zod";

const EmailValidationPropsSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  token: z.string(),
  createdAt: z.date(),
});

export type EmailValidationProps = z.infer<typeof EmailValidationPropsSchema>;

export interface EmailValidationData {
  id: string;
  email: string;
  token: string;
  createdAt: Date;
}

const EMAIL_VALIDATION_EXPIRATION_TIME = 10 * 60 * 1000; // 10 minutes

export class EmailValidation extends Entity<EmailValidationProps, string> {
  constructor(props: EmailValidationProps) {
    super(props);
  }

  get email() {
    return this._props.email;
  }

  get expiresAt(): Date {
    return new Date(
      this._props.createdAt.getTime() + EMAIL_VALIDATION_EXPIRATION_TIME,
    );
  }

  static create(props: EmailValidationProps): Result<EmailValidation, Error> {
    const result = EmailValidationPropsSchema.safeParse(props);
    if (!result.success) {
      return Err.of(new EntityValidationError(result.error.errors));
    }

    return Ok.of(
      new EmailValidation({
        id: props.id,
        email: props.email,
        token: props.token,
        createdAt: props.createdAt,
      }),
    );
  }
}
