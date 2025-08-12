import { z } from 'zod'

const supportedLanguages = ['th', 'en'] as const

const configSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  PORT: z.number(),
  LANGUAGE: z.enum(supportedLanguages),
  OPEN_AI_DEFAULT_API_KEY: z.string(),
  API_URL: z.string(),
  ALLOW_ORIGINS: z.array(z.string()).optional(),
  MEILISEARCH: z.object({
    HOST: z.string(),
    API_KEY: z.string(),
    INDEX: z.object({
      PRODUCT_INDEX: z.string(),
    }),
  }),
  DATABASE: z.object({
    USER: z.string(),
    PASSWORD: z.string(),
    HOST: z.string(),
    PORT: z.number(),
    DATABASE: z.string(),
    SSL_REJECT_UNAUTHORIZED: z.boolean().optional(),
  }),
})

export const env = configSchema.parse({
  NODE_ENV: envToStr(process.env.NODE_ENV, 'production'),
  PORT: envToNumber(process.env.PORT, 8081),
  LANGUAGE: envToStr(process.env.LANGUAGE),
  OPEN_AI_DEFAULT_API_KEY: envToStr(process.env.OPEN_AI_DEFAULT_API_KEY),
  ALLOW_ORIGINS: envToArray(process.env.ALLOW_ORIGINS),
  MEILISEARCH: {
    HOST: envToStr(process.env.MEILISEARCH_HOST),
    API_KEY: envToStr(process.env.MEILISEARCH_API_KEY),
    INDEX: {
      PRODUCT_INDEX: envToStr(process.env.MEILISEARCH_PRODUCT_INDEX),
    },
  },
  API_URL: envToStr(process.env.API_URL),
  DATABASE: {
    USER: envToStr(process.env.DATABASE_USER),
    PASSWORD: envToStr(process.env.DATABASE_PASSWORD),
    HOST: envToStr(process.env.DATABASE_HOST),
    PORT: envToNumber(process.env.DATABASE_PORT, 5432),
    DATABASE: envToStr(process.env.DATABASE_NAME),
    SSL_REJECT_UNAUTHORIZED: envToBool(
      process.env.DATABASE_SSL_REJECT_UNAUTHORIZED,
    ),
  },
})

// helper functions //
function envToStr(value: string | undefined, defaultValue = '') {
  return value === undefined ? defaultValue : value
}

function envToNumber(value: string | undefined, defaultValue: number): number {
  const numValue =
    value === undefined || value === '' ? defaultValue : Number(value)

  return isNaN(numValue) ? defaultValue : numValue
}

function envToArray(
  value: string | undefined,
  defaultValue: string[] = [],
): string[] {
  return value === undefined
    ? defaultValue
    : value.split(',').map((item) => item.trim())
}

function envToBool(value: string | undefined, defaultValue = false): boolean {
  if (!value) {
    return defaultValue
  }

  return ['true', 'TRUE', '1'].includes(value)
}
