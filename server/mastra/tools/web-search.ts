import { createTool } from "@mastra/core"
import { z } from "zod"
import { webSearch } from "~~/server/utils/webSearch"

export const webSearchTool = createTool({
  id: "web-search",
  description: "Search the web for information",
  inputSchema: z.object({
    query: z.string().describe("The query to search the web for"),
  }),
  outputSchema: z.object({
    results: z.array(z.string()).describe("The results of the search"),
  }),
  execute: async ({ context }) => {
    const results = await webSearch(context.query)
    return { results }
  },
})
