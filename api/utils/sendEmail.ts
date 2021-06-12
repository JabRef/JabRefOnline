import nodemailer from 'nodemailer'

export async function sendEmail(to: string, html: string): Promise<void> {
  const testAccount = await nodemailer.createTestAccount()
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  })
  await transporter.sendMail({
    from: '"JabRef" <jabref@example.com>', // sender address
    to, // list of receivers
    subject: 'Reset your password', // Subject line
    html, // plain text body
  })
}
