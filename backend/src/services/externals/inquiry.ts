import { api } from '@/utils/api'
import { env } from '@/utils/env'

const inquiry = {
  inquiryMessage: async (productId: string, content: string) => {
    try {
      const response = await api<{
        order_id: string
        order: {
          order_code: string
        }
      }>({
        url: `${env.API_URL}/api/message`,
        method: 'post',
        data: {
          product_id: productId,
          inquiry_wht: false,
          content,
          affiliate_rid: '',
        },
        headers: {
          Authorization: `Bearer xxxx`,
        },
      })

      return response.data
    } catch {
      console.log('mock results')
      return mockInquiryMessage
    }
  },
}

export default inquiry

const mockInquiryMessage = {
  order_id: '9d493d86-76b3-4fb8-8f88-58bb2a208388',
  order: {
    created_at: '2025-07-13T13:41:01.436Z',
    updated_at: '2025-08-12T10:55:11.877Z',
    id: '9d493d86-76b3-4fb8-8f88-58bb2a208388',
    order_code: 'KHOII0W3',
  },
}
