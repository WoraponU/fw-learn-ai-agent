import {
  //   AIMessage,
  HumanMessage,
  SystemMessage,
} from '@langchain/core/messages'
import { tool } from '@langchain/core/tools'
import { ToolNode } from '@langchain/langgraph/prebuilt'
import { z } from 'zod'

import { chatOpenAIModel } from '@/models/open-ai.model'
import meilisearchCommand from '@/services/externals/meilisearch.command'
import { GraphState } from '@/workflows/search-assistant/workflow'

export const semanticSearchProductTool = tool(
  async (args: { searchQuery: string }) => {
    try {
      const productResponse = await meilisearchCommand.searchProduct(
        args.searchQuery,
        {
          limit: 4,
          hybrid: {
            semanticRatio: 0.8,
            embedder: 'largeEmbedding-150',
          },
          showRankingScore: true,
        },
      )

      const response = productResponse?.hits || []
      return JSON.stringify(response) || []
    } catch (error) {
      console.error('semanticSearchProductTool()', error)
      return []
    }
  },
  {
    name: 'search_product',
    description: 'can search the products that match the search query',
    schema: z.object({
      searchQuery: z.string().describe('search query'),
    }),
  },
)

export const semanticSearchProductToolNode = new ToolNode([
  semanticSearchProductTool,
])

export async function productRetrieverNode(state: typeof GraphState.State) {
  const queryOptimized = state?.queryOptimized

  const model = chatOpenAIModel({
    modelName: 'gpt-4.1',
    temperature: 0,
  })
  const modelWithTool = model.bindTools([semanticSearchProductTool], {
    tool_choice: semanticSearchProductTool.name,
  })

  const messages = [
    new SystemMessage(
      `You are the Product Retriever Agent for Fastwork.co.
Your role is to analyze the query optimized and return the products that match the query.
`,
    ),
    new HumanMessage(queryOptimized),
  ]
  const result = await modelWithTool.invoke(messages)

  return {
    messages: [result],
    mode: 'wait-feedback',
  }
}
