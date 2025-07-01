import { pgTable, text, boolean, timestamp } from "drizzle-orm/pg-core"
import { user } from "../auth/auth-schema"

export * from "../auth/auth-schema"

export const userSettings = pgTable("user_settings", {
  userId: text("user_id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  emailNotifications: boolean("email_notifications").notNull().default(true),
  theme: text("theme").notNull().default("system"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})
