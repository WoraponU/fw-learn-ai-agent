import { ChatOpenAI, type ChatOpenAIFields } from '@langchain/openai'

import { env } from '@/utils/env'

export const chatOpenAIModel = (options?: ChatOpenAIFields) => {
  const defaultOptions: ChatOpenAIFields = {
    modelName: 'gpt-4.1-mini',
    temperature: 0,
    apiKey: env.OPEN_AI_DEFAULT_API_KEY,
  }

  return new ChatOpenAI({
    ...defaultOptions,
    ...options,
  })
}
