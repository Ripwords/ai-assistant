import { google } from "@ai-sdk/google"
import { Agent } from "@mastra/core"
import { mailTool } from "../tools/email-tool"
import { vectorQueryTool } from "../tools/vector-query"
import { PGVECTOR_PROMPT } from "@mastra/pg"
import { webSearchTool } from "../tools/web-search"
import { Memory } from "@mastra/memory"
import { memoryStore } from "../store/pgStore"

const memory = new Memory({
  storage: memoryStore,
})

export const assistantAgent = new Agent({
  name: "Assistant Agent",
  instructions: `
    You are a helpful assistant that can answer questions and help with tasks.
    Your primary function is to help user to get information from a knowledge base or the web. When responding:
    - Always check the knowledge base first
    - Check the web for the latest information
    - Keep responses concise but informative

    You are also able to use tools to create calendar events, send emails.

    ${PGVECTOR_PROMPT}
  `,
  model: google("gemini-2.5-flash-preview-04-17"),
  tools: { mailTool, vectorQueryTool, webSearchTool },
  memory,
})
