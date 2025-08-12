import { HTTPException } from 'hono/http-exception'

export interface ErrorParams {
  message?: string
  code?: string
  metadata?: unknown
}

export const BadRequestException = (params?: ErrorParams) => {
  return new HTTPException(400, {
    message: params?.message || 'Bad Request',
    cause: {
      code: params?.code || 'BAD_REQUEST',
      metadata: params?.metadata,
    },
  })
}

export const UnauthorizedException = (params?: ErrorParams) => {
  return new HTTPException(401, {
    message: params?.message || 'Unauthorized',
    cause: {
      code: params?.code || 'UNAUTHORIZED',
    },
  })
}

export const ForbiddenException = (params?: ErrorParams) => {
  return new HTTPException(403, {
    message: params?.message || 'Forbidden',
    cause: {
      code: params?.code || 'FORBIDDEN',
    },
  })
}

export const NotFoundException = (params?: ErrorParams) => {
  return new HTTPException(404, {
    message: params?.message || 'Not Found',
    cause: {
      code: params?.code || 'NOT_FOUND',
    },
  })
}

export const InternalServerException = (params?: ErrorParams) => {
  return new HTTPException(500, {
    message: params?.message || 'Internal Server Error',
    cause: {
      code: params?.code || 'INTERNAL_SERVER_ERROR',
    },
  })
}
