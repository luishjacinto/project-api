import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

import { createNodemailerTransport } from './create-nodemailer-transport'

export async function sendMail(
  toAddress: string | Mail.Address | (string | Mail.Address)[],
  subject: string,
  text: string
) {
  const transporter = nodemailer.createTransport(await createNodemailerTransport())

  const mailOptions: Mail.Options = {
    from: 'Project',
    to: toAddress,
    subject,
    text
  }

  transporter.sendMail(mailOptions, function (error, _) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent')
    }
  })
}
