import { type Env, type ExecutionContext, Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { timeout } from 'hono/timeout'

import searchController from '@/controllers/search.controller'
import { errorHandler } from '@/middlewares/app.middleware'
import { env } from '@/utils/env'

import { i18n, initializationPromise } from './initialize'

async function startServer() {
  // --- Wait for Central Initialization First ---
  await initializationPromise
  // --- Initialization Complete ---

  // root app
  const rootApp = new Hono()

  // middleware
  rootApp.use(
    '*',
    cors({
      origin: env.ALLOW_ORIGINS || '*',
    }),
  )
  rootApp.use(logger())
  rootApp.use('*', timeout(1000 * 15))
  rootApp.use('*', async (c, next) => {
    const acceptLang = c.req.header('fw-locale')?.split(',')[0] || env.LANGUAGE

    i18n.changeLanguage(acceptLang)
    await next()
  })

  rootApp.get('/healthz', (c) => {
    return c.text('healthz')
  })

  // app router
  const router = rootApp.basePath('/ai/agent/v1')
  router.onError(errorHandler)

  router.route('/', searchController())

  return router
}

// Create the fetch handler
let appPromise: Promise<Hono> | null = null
const fetchHandler = async (
  request: Request,
  env: Env,
  ctx: ExecutionContext,
) => {
  if (!appPromise) {
    // Ensure startServer (which awaits initialization) is called
    appPromise = startServer()
  }
  const app = await appPromise
  return app.fetch(request, env, ctx)
}
export default {
  port: env.PORT,
  fetch: fetchHandler,
  maxRequestBodySize: 1024 * 1024 * 10,
  timeout: 10000,
  idleTimeout: 255,
}
