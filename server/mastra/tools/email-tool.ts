import { createTool } from "@mastra/core"
import z from "zod"
import { sendEmail } from "~~/server/utils/mail"

export const mailTool = createTool({
  id: "send-email",
  description: "Send an email to a recipient",
  inputSchema: z.object({
    to: z.string().describe("The email address of the recipient"),
    subject: z.string().describe("The subject of the email"),
    message: z.string().describe("The body of the email"),
  }),
  outputSchema: z.object({
    success: z.boolean().describe("Whether the email was sent successfully"),
  }),
  execute: async ({ context }) => {
    try {
      console.log("Sending email to", context.to)
      console.log("Subject", context.subject)
      console.log("Message", context.message)
      await sendEmail(context.to, context.subject, context.message)
      return { success: true }
    } catch (error) {
      console.error(error)

      return { success: false }
    }
  },
})
