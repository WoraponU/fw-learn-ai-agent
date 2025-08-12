import type { ErrorHandler } from 'hono'
import { HTTPException } from 'hono/http-exception'

// Define a type alias for the expected cause structure
type HttpExceptionCause = {
  code?: string
  metadata?: unknown
}

export const errorHandler: ErrorHandler = (err, c) => {
  // log to server for debugging
  console.error(c.req.path, err.message)

  if (err instanceof HTTPException) {
    return c.json(
      {
        error: {
          code: (err.cause as HttpExceptionCause)?.code || 'UNKNOWN_ERROR',
          detail: (err.cause as HttpExceptionCause)?.metadata ?? err.message,
        },
      },
      err.status,
    )
  }

  // Default error handler
  return c.json(
    {
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        detail: 'Internal Server Error',
      },
    },
    500,
  )
}
