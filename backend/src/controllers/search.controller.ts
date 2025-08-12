import { HumanMessage } from '@langchain/core/messages'
import { Command } from '@langchain/langgraph'
import { Hono } from 'hono'
import { streamSSE } from 'hono/streaming'

import searchValidator from '@/controllers/validations/search.validation'
import searchService from '@/services/search.service'

const controller = () => {
  const app = new Hono()

  app.get('/search.assistant', searchValidator().searchAssistant, async (c) => {
    const validated = c.req.valid('query')
    const config = { configurable: { thread_id: validated.thread_id } }
    const inputs = {
      messages: [new HumanMessage(validated.q?.toLowerCase())],
    }

    let id = 1
    const app = await searchService.searchAssistant()
    return streamSSE(c, async (stream) => {
      await stream.writeSSE({
        data: '',
        event: 'connected',
        id: String(id++),
      })
      for await (const { messages, ...other } of await app.stream(inputs, {
        ...config,
        streamMode: 'values',
      })) {
        const msg = messages[messages?.length - 1]

        const print = {
          ...msg,
          type: msg?._getType?.(),
          content: msg?.content,
          tool_calls: msg?.tool_calls,
        }

        await stream.writeSSE({
          data: JSON.stringify({ message: print, state: other }),
          event: 'updated',
          id: String(id++),
        })
      }

      await stream.writeSSE({
        data: '',
        event: 'end',
        id: String(id++),
      })
      await stream.close()
    })
  })

  app.get(
    '/search.assistantFeedback',
    searchValidator().searchAssistantFeedback,
    async (c) => {
      const validated = c.req.valid('query')
      const config = { configurable: { thread_id: validated.thread_id } }

      let id = 0
      const app = await searchService.searchAssistant()
      return streamSSE(c, async (stream) => {
        await stream.writeSSE({
          data: '',
          event: 'connected',
          id: String(id++),
        })

        for await (const { messages, ...other } of await app.stream(
          new Command({ resume: validated.product_ids }),
          {
            ...config,
            streamMode: 'values',
          },
        )) {
          const msg = messages[messages?.length - 1]

          const print = {
            ...msg,
            type: msg?._getType?.(),
            content: msg?.content,
            tool_calls: msg?.tool_calls,
          }

          await stream.writeSSE({
            data: JSON.stringify({ message: print, state: other }),
            event: 'updated',
            id: String(id++),
          })
        }

        await stream.writeSSE({
          data: '',
          event: 'end',
          id: String(id++),
        })
        await stream.close()
      })
    },
  )

  return app
}

export default controller
