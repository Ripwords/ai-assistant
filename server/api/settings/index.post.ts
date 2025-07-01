import { db } from "../../db"
import { userSettings } from "../../db/schema"
import { z } from "zod"
import { auth } from "../../auth"

const bodySchema = z.object({
  emailNotifications: z.boolean(),
  theme: z.string(),
})

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession(event)
  if (!session) {
    throw createError({ statusCode: 401, statusMessage: "Unauthenticated" })
  }

  const body = await readValidatedBody(event, bodySchema.parse)

  // Upsert settings
  await db
    .insert(userSettings)
    .values({
      userId: session.user.id,
      emailNotifications: body.emailNotifications,
      theme: body.theme,
    })
    .onConflictDoUpdate({
      target: userSettings.userId,
      set: {
        emailNotifications: body.emailNotifications,
        theme: body.theme,
        updatedAt: new Date(),
      },
    })

  return { success: true }
})
