import { readMultipartFormData, createError } from "h3"
import { MDocument } from "@mastra/rag"
import { openai } from "@ai-sdk/openai"
import { embedMany } from "ai"
import { pgVectorStore, KNOWLEDGE_BASE_INDEX } from "../../mastra/store/pgVec"

export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event)

  if (!form?.length) {
    throw createError({ statusCode: 400, statusMessage: "Missing file" })
  }

  type FilePart = { type: "file"; data: Buffer }

  const isFilePart = (p: unknown): p is FilePart => {
    if (typeof p !== "object" || p === null) return false
    const maybe = p as { type?: unknown; data?: unknown }
    return (
      maybe.type === "file" &&
      typeof maybe.data !== "undefined" &&
      Buffer.isBuffer(maybe.data)
    )
  }

  const filePart = form.find(isFilePart)

  if (!filePart) {
    throw createError({ statusCode: 400, statusMessage: "Invalid file" })
  }

  const text = filePart.data.toString("utf-8")

  const doc = MDocument.fromText(text)
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
