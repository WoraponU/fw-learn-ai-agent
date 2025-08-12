import { t } from 'i18next'
import { z } from 'zod'

import { querySchemaValidator } from '@/utils/validation'

const validation = () => ({
  searchAssistant: querySchemaValidator(
    z.object({
      q: z
        .string({
          required_error: t('common:validation.required'),
        })
        .min(1, {
          message: t('common:validation.min-length', { min: 1 }),
        })
        .max(300, {
          message: t('common:validation.max-length', { max: 300 }),
        }),
      thread_id: z
        .string({
          required_error: t('common:validation.required'),
        })
        .min(1, {
          message: t('common:validation.min-length', { min: 1 }),
        })
        .max(300, {
          message: t('common:validation.max-length', { max: 300 }),
        }),
    }),
  ),
  searchAssistantFeedback: querySchemaValidator(
    z.object({
      product_ids: z.array(z.string()),
      thread_id: z
        .string({
          required_error: t('common:validation.required'),
        })
        .min(1, {
          message: t('common:validation.min-length', { min: 1 }),
        })
        .max(300, {
          message: t('common:validation.max-length', { max: 300 }),
        }),
    }),
  ),
})

export default validation
