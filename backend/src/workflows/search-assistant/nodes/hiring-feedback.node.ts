import { AIMessage } from '@langchain/core/messages'
import { Command, interrupt } from '@langchain/langgraph'

import inquiryCommand from '@/services/externals/inquiry'
import { GraphState } from '@/workflows/search-assistant/workflow'

// Delay utility function
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function hiringActionNode(state: typeof GraphState.State) {
  const hiringFeedback = state?.hiringFeedback
  const orderCodes: string[] = []

  if (hiringFeedback?.length > 0) {
    for (const productId of hiringFeedback) {
      try {
        await delay(Math.random() * 1000) // Add 1 second delay before processing each product
        const content = `${state?.requirementOptimized} \n\n\n product: ${productId}`
        const response = await inquiryCommand.inquiryMessage(productId, content)

        orderCodes.push(response?.order?.order_code)
      } catch (error) {
        console.error('Error sending inquiry message', error)
      }
    }

    return {
      messages: [
        new AIMessage({
          content: `ทักให้เรียบร้อยแล้วครับ ${orderCodes.join(', ')}`,
        }),
      ],
      orderCodes,
    }
  }

  return {
    messages: [
      new AIMessage({
        content: 'ส่งข้อมูลการจ้างงานไม่สำเร็จ',
      }),
    ],
  }
}

export async function hiringFeedbackNode(_: typeof GraphState.State) {
  console.log('--- humanFeedback ---')

  const feedback: string[] = interrupt('Please provide feedback')

  if (!feedback || feedback?.length === 0) {
    return new Command({ goto: 'product-retriever-node' })
  }
  console.log('feedback continue', feedback)
  return {
    messages: [new AIMessage({ content: 'ทักอยู่ครับ รอแปป...' })],
    hiringFeedback: feedback,
    mode: 'hiring',
  }
}
