import type { User } from '../database'

export function resetPasswordTemplate(id: string, token: string): string {
  return `
  <!doctype html>
  <html lang="en-US">

  <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title>Reset Password Email</title>
      <meta name="description" content="Reset Password Email Template.">
      <style type="text/css">
          a:hover {text-decoration: underline !important;}
      </style>
  </head>

  <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
      <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" font-family: 'Open Sans', sans-serif;">
          <tr>
              <td>
                  <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                      align="center" cellpadding="0" cellspacing="0">
                      <tr>
                          <td style="height:80px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td style="height:20px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td>
                              <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                  style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                  <tr>
                                      <td style="height:40px;">&nbsp;</td>
                                  </tr>
                                  <tr>
                                      <td style="padding:0 35px;">
                                          <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">We received a request to reset your password</h1>
                                          <span
                                              style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                          <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                              A unique link to reset your
                                              password has been generated for you. To reset your password, click the
                                              following link and follow the instructions.
                                          </p>
                                          <a href="http://localhost:3000/change-password?id=${id}&token=${token}"
                                              style="background:black;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;">Reset
                                              Password</a>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td style="height:40px;">&nbsp;</td>
                                  </tr>
                              </table>
                          </td>
                      <tr>
                          <td style="height:20px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td style="height:80px;">&nbsp;</td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
  </body>

  </html>`
}

export function resetPasswordUserNotFoundTemplate(): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Password Reset Request - Email Address Not Found</title>
    </head>
    <body>
      <h2>Password Reset Request - Email Address Not Found</h2>
      <p>Dear user,</p>
      <p>We received your password reset request; however, we couldn't locate an account associated with the provided email address. Here are a few suggestions:</p>
      <ol>
        <li>Double-check the email: Please ensure that you entered the correct email address when requesting the password reset.</li>
        <li>Create a new account: If you don't have an account with us yet, we invite you to <a href="https://www.jabref.org/user/register">create one</a> on our registration page.</li>
        <li>Contact support: For further assistance or if you suspect an issue, please reach out to our support team, who will be happy to help.</li>
      </ol>
      <p>We apologize for any inconvenience caused. To protect user privacy, we can't disclose whether an email address is registered in our system.</p>
      <p>If you didn't initiate the password reset request or have concerns, please contact us immediately. We'll investigate promptly and take necessary actions to ensure account security.</p>
      <p>Best regards,</p>
      <p>JabRef Team</p>
    </body>
    </html>
    `
}

export function welcomeTemplate(user: User): string {
  // TODO: Use an temporary id for the link
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Welcome to JabRef! Confirm your email and get started</title>
    </head>
    <body>
      <h2>Welcome to JabRef!</h2>
      <p>Dear ${user.name ?? 'JabRef User'},</p>
      <p>We're looking forward to pushing the boundaries of research with you! To get started, please confirm your email address by clicking the button below:</p>
      <a href="https://www.jabref.org/user/confirm-email/${user.id}" style="background:black;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;">Confirm Email</a>
    </body>
    </html>
    `
}
