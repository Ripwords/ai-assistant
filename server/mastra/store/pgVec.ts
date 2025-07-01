import { PgVector } from "@mastra/pg"

export const pgVectorStore = new PgVector({
  connectionString: process.env.DATABASE_URL!,
})

export const KNOWLEDGE_BASE_INDEX = "knowledge_base"

// Ensure index exists; this runs at cold start in server runtime
pgVectorStore
  .createIndex({ indexName: KNOWLEDGE_BASE_INDEX, dimension: 1536 })
  .catch(() => {
    // Ignore if already exists
  })
