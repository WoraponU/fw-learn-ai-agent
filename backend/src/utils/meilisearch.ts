import { MeiliSearch } from 'meilisearch'

import { env } from '@/utils/env'

const meilisearchInstance = new MeiliSearch({
  host: env.MEILISEARCH.HOST,
  apiKey: env.MEILISEARCH.API_KEY,
})

export const meilisearch = {
  productIndex: meilisearchInstance.index(env.MEILISEARCH.INDEX.PRODUCT_INDEX),
}
