import { db } from "../../db"
import { userSettings } from "../../db/schema"
import { auth } from "../../auth"
import { createError } from "h3"
import { eq } from "drizzle-orm"

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession(event)
  if (!session) {
    throw createError({ statusCode: 401, statusMessage: "Unauthenticated" })
  }

  const settings = await db
    .select()
    .from(userSettings)
    .where(eq(userSettings.userId, session.user.id))
    .limit(1)
    .execute()

  return settings[0] ?? { emailNotifications: true, theme: "system" }
})
