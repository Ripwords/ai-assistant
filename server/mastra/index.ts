import { Mastra } from "@mastra/core/mastra"
import { PinoLogger } from "@mastra/loggers"
import { pgVectorStore } from "./store/pgVec"
import { assistantAgent } from "./agents/assistant-agent"
import { memoryStore } from "./store/pgStore"

export const mastra = new Mastra({
  agents: { assistantAgent },
  storage: memoryStore,
  logger: new PinoLogger({
    name: "Mastra",
    level: "info",
  }),
  vectors: {
    pgVectorStore,
  },
})
