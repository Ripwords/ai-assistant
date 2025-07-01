import { z } from "zod"
import { mastra } from "../mastra"
import { auth } from "../auth"

const bodySchema = z.object({
  message: z.string(),
})

export default defineEventHandler(async (event) => {
  const userSession = await auth.api.getSession(event)
  if (!userSession) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    })
  }

  const { user, session } = userSession

  const { message } = await readValidatedBody(event, bodySchema.parse)

  const resourceId = user.id
  const threadId = session.id

  const response = await mastra
    .getAgent("assistantAgent")
    .generate(message, { resourceId, threadId })

  return { reply: response }
})
