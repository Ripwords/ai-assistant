import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "../db"

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  throw new Error("GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set")
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: false,
  },
  user: {
    additionalFields: {
      image: {
        type: "string",
      },
    },
  },
  socialProviders: {
    google: {
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      accessType: "offline",
      prompt: "select_account+consent",
      mapProfileToUser: async (profile) => {
        return {
          email: profile.email,
          name: profile.given_name,
          image: profile.picture,
        }
      },
      scopes: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/calendar.app.created",
      ],
    },
  },
})
