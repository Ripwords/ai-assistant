import { createVectorQueryTool } from "@mastra/rag"
import { openai } from "@ai-sdk/openai"

import { KNOWLEDGE_BASE_INDEX } from "../store/pgVec"

export const vectorQueryTool = createVectorQueryTool({
  vectorStoreName: "pgVectorStore",
  indexName: KNOWLEDGE_BASE_INDEX,
  model: openai.embedding("text-embedding-3-small"),
})
