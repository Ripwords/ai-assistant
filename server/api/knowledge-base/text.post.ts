import { z } from "zod"
import { MDocument } from "@mastra/rag"
import { openai } from "@ai-sdk/openai"
import { embedMany } from "ai"
import { pgVectorStore, KNOWLEDGE_BASE_INDEX } from "../../mastra/store/pgVec"

const bodySchema = z.object({
  text: z.string(),
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse)

  const doc = MDocument.fromText(body.text)

  const chunks = await doc.chunk({
    strategy: "recursive",
    size: 512,
    overlap: 50,
  })

  const { embeddings } = await embedMany({
    model: openai.embedding("text-embedding-3-small"),
    values: chunks.map((c) => c.text),
  })

  await pgVectorStore.upsert({
    indexName: KNOWLEDGE_BASE_INDEX,
    vectors: embeddings,
    metadata: chunks.map((c) => ({ text: c.text })),
  })

  return { success: true }
})
