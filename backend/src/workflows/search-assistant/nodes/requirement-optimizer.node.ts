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
const requirementOptimizerOutputSchema = z.object({
  requirementOptimized: z
    .string()
    .describe('The optimized query for semantic search'),
})

export async function requirementOptimizerNode(state: typeof GraphState.State) {
  const humanMessages = filterMessages(state.messages, {
    includeTypes: [HumanMessage],
  })

  const messages = [
    new SystemMessage(
      `You are an assistant that summarizes the entire conversation between the user and the AI agent into a single, well-structured hiring message for a freelancer.

**Instructions:**
- Carefully read all user and AI messages in the conversation.
- Identify the main task, requirements, context, and any preferences (e.g., style, budget, timeline, industry, platform, language).
- Remove redundant details and irrelevant exchanges.
- Present all key information the freelancer needs to quickly understand the job and respond accurately.
- Write the summary as a clear, direct hiring request to the freelancer.
- Output only the final hiring message. Do not add explanations or meta-commentary.

**Example Input (conversation):**
[
  {'ai': 'What do you need help with?', 'user': 'I want a logo design.'},
  {'ai': 'What style or details?', 'user': 'Minimal style, for a Thai restaurant, budget 1000 THB.'},
  {'ai': 'What is your timeline?', 'user': 'Within 5 days.'}
]

**Example Output:**
I'm looking for a minimal-style logo design for my Thai restaurant. My budget is 1,000 THB and I need it completed within 5 days.`,
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
    requirementOptimizerOutputSchema,
  )

  const result = await modelWithStructuredOutput.invoke(messages)

  return {
    messages: [new AIMessage({ content: result.requirementOptimized })],
    requirementOptimized: result.requirementOptimized,
  }
}
