declare namespace Meilisearch {
  type SubcategoryDocument = {
    id: string
    h1: string
    title: string
    slug: string
    description: string
    bottom_page_description?: string
    top_page_description?: string
    sort_order: number
    _rankingScore?: number
  }

  type ProductDocument = {
    id: string
    title: string
    slug: string
    description: string
    _rankingScore?: number
  }
}
