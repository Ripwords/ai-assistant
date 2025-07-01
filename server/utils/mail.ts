import { createTransport } from "nodemailer"

export const sendEmail = async (
  email: string,
  subject: string,
  message: string
) => {
  const auth = {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  }

  const transporter = createTransport({
    name: process.env.SMTP_USER,
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth,
    tls: {
      rejectUnauthorized: false,
    },
  })

  await transporter.sendMail({
    from: process.env.SMTP_SENDER,
    to: email,
    subject,
    text: message,
    html: `<p>${message}</p>`,
  })
}

export const sendVerificationOTP = async (email: string, otp: string) => {
  const message = `Your verification code is ${otp}`
  console.log(message)
  await sendEmail(email, "Verification Code", message)
}
