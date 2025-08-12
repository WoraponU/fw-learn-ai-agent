import { AxiosError } from 'axios'

declare global {
  enum ApiErrorType {
    BAD_REQUEST = 'BAD_REQUEST',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
    SCHEMA_VALIDATION_ERROR = 'SCHEMA_VALIDATION_ERROR',
    INVALID_VERIFICATION_CODE = 'INVALID_VERIFICATION_CODE',
    INVALID_USER_BLACKLIST = 'INVALID_USER_BLACKLIST',
  }

  type ApiErrorResponseFormat = AxiosError<{
    error:
      | {
          code: ApiErrorType.INTERNAL_SERVER_ERROR
          detail: string
        }
      | {
          code: ApiErrorType.BAD_REQUEST
          detail: string
        }
      | {
          code: ApiErrorType.SCHEMA_VALIDATION_ERROR
          detail: Record<string, string[]>
        }
      | {
          code: ApiErrorType.INVALID_VERIFICATION_CODE
          detail: string
        }
      | {
          code: ApiErrorType.INVALID_USER_BLACKLIST
          detail: string
        }
  }>
  type ApiResponseFormat<T> = {
    data: T
  }

  type ApiListingResponseFormat<T> = {
    data: T[]
    metadata: {
      page: number
      page_size: number
      total_items: number
      total_pages: number
    }
  }
}

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false
  }
}
