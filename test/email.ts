interface EmailMessage {
  from: string
  subject: string
  date: string
  body: string
  textBody: string
  htmlBody: string
}

export function getTemporaryEmail(): string {
  const randomId = Math.floor(Math.random() * 10000)
  return 'jabref-test' + randomId + '@1secmail.com'
}
export async function getEmail(email: string): Promise<EmailMessage> {
  const [login, domain, _] = email.split('@')
  const response = await fetch(
    `https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`,
  )
  const messages = await response.json()
  if (messages.length === 0) {
    // Try again in 1 second if there are no messages
    return new Promise((resolve) => {
      setTimeout(async () => {
        resolve(await getEmail(email))
      }, 1000)
    })
  }
  const message = messages[0]
  const messageResponse = await fetch(
    `https://www.1secmail.com/api/v1/?action=readMessage&login=${login}&domain=${domain}&id=${message.id}`,
  )
  const messageJson = await messageResponse.json()
  return messageJson
}
