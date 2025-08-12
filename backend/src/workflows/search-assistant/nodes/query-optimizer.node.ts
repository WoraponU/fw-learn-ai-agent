import {
  AIMessage,
  filterMessages,
  HumanMessage,
  SystemMessage,
} from '@langchain/core/messages'
import { z } from 'zod'

import { chatOpenAIModel } from '@/models/open-ai.model'
import { GraphState } from '@/workflows/search-assistant/workflow'

// Define the slot filling output schema
// Define the structured output schema using Zod
const queryOptimizerOutputSchema = z.object({
  queryOptimized: z
    .string()
    .describe('The optimized query for semantic search'),
})

export async function queryOptimizerNode(state: typeof GraphState.State) {
  const humanMessages = filterMessages(state.messages, {
    includeTypes: [HumanMessage],
  })

  const messages = [
    new SystemMessage(
      `You are the Query Optimizer Agent for Fastwork.co.
Your role is to analyze the full conversation history between the user and the AI assistant, and produce a single, compact sentence that summarizes the user's core requirement for freelancer search For searching with semantic search.

**Instructions:**
- Ignore AI prompts and focus on extracting user responses only.
- Combine all relevant user details into one concise sentence.
- Remove redundant or conversational language.
- Prioritize the main topic, required service, style, context, and any specific constraints (e.g., main description, category or subcategory).
- Exclude greetings and budget, filler words, or unnecessary context.
- Your output should be a single sentence, optimized for use as a semantic search query.

**Example:**
Conversation:
[
  {
    "ai": "What are you looking for?",
    "user": "I'm looking for logo design service."
  },
  {
    "ai": "What style do you like or additional detail?",
    "user": "I want a logo for a Thai restaurant with a minimal style and my budget is around 1,000 baht."
  }
]
**Output:**
logo design service with minimal style for Thai restaurant

**Output format:**
Return only the optimized, compact sentence—do not add explanation or context.`,
    ),
    ...(humanMessages || []),
  ]

  const model = chatOpenAIModel({
    modelName: 'gpt-4.1',
    temperature: 0,
    streaming: false, // Disable streaming for structured output
  })

  // Create structured output model
  const modelWithStructuredOutput = model.withStructuredOutput(
    queryOptimizerOutputSchema,
  )

  const result = await modelWithStructuredOutput.invoke(messages)

  return {
    messages: [new AIMessage({ content: result.queryOptimized })],
    queryOptimized: result.queryOptimized,
  }
}
