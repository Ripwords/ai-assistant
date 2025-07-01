import { PostgresStore } from "@mastra/pg"

export const memoryStore = new PostgresStore({
  connectionString: process.env.DATABASE_URL!,
})
