interface EmailMessage {
  from: string
  subject: string
  received: string //Date in ISO 8601
  textBody: string
  // body: string
  // htmlBody: string
}

interface MailAddress {
  address: string
  name: string
}

interface MailsacResponse {
  _id: string
  from: MailAddress[]
  to: MailAddress[]
  subject: string
  received: string //Date in ISO 8601
}

export function getTemporaryEmail(): string {
  const randomId = Math.floor(Math.random() * 10000)
  return `jabref-test${randomId}@mailsac.com`
}
export async function getEmail(email: string): Promise<EmailMessage> {

  if(!process.env.NUXT_MAILSAC_KEY || process.env.NUXT_MAILSAC_KEY === 'none') {
    throw new Error('No Mailsac API key configured')
  }

  const headers = {
    'mailsac-key': process.env.NUXT_MAILSAC_KEY,
  }
  

  const [login, domain] = email.split('@')
  const response = await fetch(
    `https://mailsac.com/api/addresses/${login}@${domain}/messages`,
    {
      headers
    },
  )

  const messages = (await response.json()) as MailsacResponse[]

  if (messages.length === 0) {
    // Try again in 1 second if there are no messages
    return new Promise((resolve) => {
      setTimeout(async () => {
        resolve(await getEmail(email))
      }, 1000)
    })
  }
  const message = messages[0]!

  const messageResponse = await fetch(
    `https://mailsac.com/api/text/${login}@${domain}/${message._id}`,
    {
      headers,
    },
  )

  const messageData = (await messageResponse.text()) as string

  return {
    from: message.from[0]!.address,
    subject: message.subject,
    received: message.received,
    textBody: messageData,
  }
}
