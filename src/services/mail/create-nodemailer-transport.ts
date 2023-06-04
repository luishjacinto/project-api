import nodemailer from 'nodemailer'
import { consoleLogOnRed } from '../../utilities/console-log-on-red'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

export async function createNodemailerTransport(): Promise<nodemailer.Transporter> {
  const {
    NODEMAILER_USER,
    NODEMAILER_PASS
  } = process.env

  try {
    if (!NODEMAILER_USER) {
      throw new Error("No NODEMAILER_USER on environment variables")
    }

    if (!NODEMAILER_PASS) {
      throw new Error("No NODEMAILER_PASS on environment variables")
    }

    let mailConfig: SMTPTransport.Options;

    if (process.env.NODE_ENV === 'production' ){
        throw new Error("Configure nodemailer on production")
    } else {
        mailConfig = {
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: NODEMAILER_USER,
                pass: NODEMAILER_PASS
            }
        };
    }

    return nodemailer.createTransport(mailConfig);
  } catch (error) {
    consoleLogOnRed(error)
    throw new Error("Trouble with mail service")
  }
}
