import { AIMessage, SystemMessage } from '@langchain/core/messages'
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts'
import { z } from 'zod'

import { chatOpenAIModel } from '@/models/open-ai.model'
import { GraphState } from '@/workflows/search-assistant/workflow'

export function supervisorAction(state: typeof GraphState.State) {
  const { mode } = state

  return mode
}

// Define the structured output schema using Zod
const supervisorOutputSchema = z.object({
  mode: z
    .enum(['search', 'qa', 'slot-filling'])
    .describe('The mode the supervisor has determined for this interaction'),
  response: z.string().describe('The natural language response to the user'),
})

export async function supervisorNode(state: typeof GraphState.State) {
  const model = chatOpenAIModel({
    modelName: 'gpt-4.1',
    temperature: 0,
    streaming: false, // Disable streaming for structured output
  })

  // Create structured output model
  const modelWithStructuredOutput = model.withStructuredOutput(
    supervisorOutputSchema,
  )

  // Create messages array with system message and conversation history
  const prompt = ChatPromptTemplate.fromMessages([
    new SystemMessage(
      `You are the Route Decider Agent for Fastwork.co's (freelancing platform) AI assistant.
Your primary task is to analyze incoming messages from the user and decide which action path to take:

1. **Entity Slot Filling for Freelancer Search (mode: "slot-filling")**
 - If the user is looking for freelancers, jobs, or services, extract all relevant entities for the search.
 - Search entities include: category, short description, budget.
 - If any entity is missing or ambiguous, ask clear, concise follow-up questions to obtain it.

2. **Searching for Freelancers (mode: "search")**
 - if got the enough information from the user.

3. **General Fastwork Q&A (mode: "qa")**
 - If the user asks about how Fastwork works, platform features, policies, commissions, dispute handling, account management, or anything not related to a specific job search.
 - If the user asks about product services, pricing, features, or anything related to the product or services.
 - Provide direct, concise, and professional answers based on Fastwork.co's knowledge base or history messages.

**Instructions:**
- Always determine the most appropriate mode (slot-filling, search, qa) for the user's message.
- For slot-filling mode: Focus on slot-filling with minimal clarifying questions.
- For search mode: process all of user's message to get the enough information and response next precess is searching and please wait for the result.
- For qa mode: Provide direct, factual answers about Fastwork platform.

**Examples:**
- User: "I need a designer for my coffee shop menu, budget 3,000 THB"
- mode: "slot-filling"
- response: "I can help you find a designer for your coffee shop menu. I see you have a budget of 3,000 THB. To find the best match, could you tell me when you need this completed and any specific style preferences you have?"

- User: "I need a designer for my coffee shop menu with minimalistic style, budget 3,000 THB"
- mode: "search"
- response: "sound good, I will start searching for you."

- User: "How does escrow payment work on Fastwork?"
- mode: "qa"
- response: "Fastwork holds client funds in escrow until work is delivered and approved. This ensures both parties are protected - clients only pay for completed work, and freelancers are guaranteed payment for approved deliverables."

**Never assume; always clarify if unsure. Never mix modes in one response.**`,
    ),
    new MessagesPlaceholder('msgs'),
  ])

  const result = await prompt.pipe(modelWithStructuredOutput).invoke({
    msgs: state.messages,
  })

  return {
    messages: [new AIMessage({ content: result.response })],
    mode: result.mode,
  }
}
