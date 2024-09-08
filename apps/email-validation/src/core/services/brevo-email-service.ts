import * as brevo from '@getbrevo/brevo';
import { BrevoConfig } from '../../config/brevo.config';
import { Err, Ok, Result } from '@ce/shared-core';


export interface SendTemplateParams {
  templateKey: string;
  to: string;
  params?: Record<string, string>;
  attachments?: { content: string; name: string }[];
}

export interface SendTemplateToAdminParams {
  templateKey: string;
  params: Record<string, string>;
}


export class TemplateNotFoundError extends Error {
  constructor(templateKey: string) {
    super(`Template with key ${templateKey} not found`);
  }
}

export class InvalidParamsForTemplateError extends Error {
  static readonly message = 'Invalid params for template';
  constructor(templateKey: string, params: any) {
    super(InvalidParamsForTemplateError.message)
  }
}

export class CannotSendTemplateError extends Error {
  static readonly message = 'Cannot send template';
  constructor(templateKey: string, to: string, params: any) {
    super(CannotSendTemplateError.message)
  }
}

export class BrevoEmailService {
  contactsApi: brevo.ContactsApi;
  transactionalEmailsApi: brevo.TransactionalEmailsApi;

  constructor(private config: BrevoConfig) {
    this.contactsApi = new brevo.ContactsApi();
    this.transactionalEmailsApi = new brevo.TransactionalEmailsApi();

    this.transactionalEmailsApi.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      config.apiKey
    );

    this.contactsApi.setApiKey(brevo.ContactsApiApiKeys.apiKey, config.apiKey);
  }

  async sendTemplate({
    templateKey,
    to,
    attachments,
    params
  }: SendTemplateParams): Promise<
    Result<
      void,
      CannotSendTemplateError
      | TemplateNotFoundError
      | InvalidParamsForTemplateError
    >
  > {
    try {
      const template = this.config.templates[templateKey];

      if (!template) {
        return Err.of(new TemplateNotFoundError(templateKey));
      }

      const parsedParams = template.paramsSchema.safeParse(params);

      if (!parsedParams.success) {
        return Err.of(
          new InvalidParamsForTemplateError(
            templateKey,
            parsedParams.error.message
          )
        );
      }

      await this.transactionalEmailsApi.sendTransacEmail({
        to: [{ email: to }],
        templateId: this.config.templates[templateKey].id,
        attachment: attachments,
        params
      });

      console.log(
        `Template ${templateKey} sent to ${to} with params: ${JSON.stringify(params)}`
      );

      return Ok.of(undefined);
    } catch (err) {
      console.error(err);
      return Err.of(new CannotSendTemplateError(templateKey, to, params));
    }
  }

  async sendTemplateToAdmin(params: SendTemplateToAdminParams) {
    await this.sendTemplate({
      templateKey: params.templateKey,
      to: this.config.sender.email,
      params: params.params
    });
  }

  async saveContact(
    email: string,
    attributes?: Record<string, any>,
    listIds: number[] = [this.config.mainListId]
  ) {
    let contact: brevo.GetExtendedContactDetails | undefined = undefined;
    try {
      contact = await this.getContact(email).then((res) => res.body);
    } catch (err) {
      // nothing to do, contact not found
    }

    if (contact) {
      const updateContact = new brevo.UpdateContact();
      updateContact.attributes = attributes;
      updateContact.listIds = listIds;
      await this.contactsApi.updateContact(email, updateContact);
    }

    const createContact = new brevo.CreateContact();
    createContact.email = email;
    createContact.listIds = listIds;
    createContact.attributes = attributes;

    await this.contactsApi.createContact(createContact);
  }

  private getContact(email: string) {
    return this.contactsApi.getContactInfo(email);
  }
}

