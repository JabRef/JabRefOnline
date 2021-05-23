import nodemailer from 'nodemailer'

export async function sendEmail(to: string, html: string) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  const testAccount = await nodemailer.createTestAccount()
  // eslint-disable-next-line no-console
  console.log(testAccount)

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  })
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to, // list of receivers
    subject: 'Change Password', // Subject line
    html, // plain text body
  })
  // eslint-disable-next-line no-console
  console.log('Message sent: %s', info.messageId)
  // Preview only available when sending through an Ethereal account
  // eslint-disable-next-line no-console
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
}
