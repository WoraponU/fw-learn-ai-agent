declare namespace Supervisor {
  type Mode = 'search' | 'qa' | 'inquiry'

  type SearchData = {
    category: string | null
    subcategory: string | null
    skills: string[] | undefined
    budget: number | null
    budgetRange:
      | 'under_1000'
      | '1000_5000'
      | '5000_10000'
      | '10000_50000'
      | 'over_50000'
      | null
    deadline: string | null
    location: string | null
    language: string | null
    description: string | null
    experience: 'beginner' | 'intermediate' | 'expert' | null
    isComplete: boolean
    missingSlots: string[]
  }

  type InquiryData = {
    inquiryType: 'complaint' | 'support' | 'feature_request' | 'general'
    priority: 'low' | 'medium' | 'high' | 'urgent'
    subject: string
    details: string
    contactInfo?: {
      email?: string
      phone?: string
    }
    attachments?: string[]
  }

  type QaData = {
    topic:
      | 'platform'
      | 'payment'
      | 'dispute'
      | 'account'
      | 'pricing'
      | 'features'
      | 'other'
    confidence: 'high' | 'medium' | 'low'
    requiresEscalation: boolean
  }

  type Output = {
    mode: Mode
    response: string
    searchData?: SearchData
    inquiryData?: InquiryData
    qaData?: QaData
  }
}
