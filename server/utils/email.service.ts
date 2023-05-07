import {
  EmailAddress,
  EmailClient,
  KnownEmailSendStatus,
} from '@azure/communication-email'
import { PipelinePolicy } from '@azure/core-rest-pipeline'
import { injectable } from 'tsyringe'

// Make sure that an exception is thrown when the tier limit is reached
// Taken from https://learn.microsoft.com/en-us/azure/communication-services/quickstarts/email/send-email-advanced/throw-exception-when-tier-limit-reached?pivots=programming-language-javascript#throw-an-exception-when-email-sending-tier-limit-is-reached
const catch429Policy: PipelinePolicy = {
  name: 'catch429Policy',
  async sendRequest(request, next) {
    const response = await next(request)
    if (response.status === 429) {
      throw new Error(response.bodyAsText || 'Too many requests')
    }
    return response
  },
}

export interface EmailService {
  sendEmail(
    to: EmailAddress[] | EmailAddress,
    subject: string,
    body: string
  ): Promise<void>
}

@injectable()
export class AzureEmailService implements EmailService {
  async sendEmail(
    to: EmailAddress[] | EmailAddress,
    subject: string,
    body: string
  ): Promise<void> {
    const config = useRuntimeConfig()
    const client = new EmailClient(config.emailClient, {
      additionalPolicies: [
        {
          policy: catch429Policy,
          position: 'perRetry',
        },
      ],
    })
    const poller = await client.beginSend({
      senderAddress: 'noreply@jabref.com',
      content: {
        subject,
        html: body,
      },
      recipients: {
        to: to instanceof Array ? to : [to],
      },
    })
    const response = await poller.pollUntilDone()
    if (response.status === KnownEmailSendStatus.Failed) {
      throw new Error(response.error?.message)
    }
  }
}

@injectable()
export class EmailServiceMock implements EmailService {
  sendEmail(
    to: EmailAddress[] | EmailAddress,
    subject: string,
    body: string
  ): Promise<void> {
    // eslint-disable-next-line no-console
    console.log(
      `Sending email to ${JSON.stringify(
        to
      )} with subject ${subject} and body ${body}`
    )
    return Promise.resolve()
  }
}

export function createEmailService(): EmailService {
  if (useRuntimeConfig().emailClient) {
    return new AzureEmailService()
  } else {
    return new EmailServiceMock()
  }
}
