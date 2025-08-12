import { PostgresSaver } from '@langchain/langgraph-checkpoint-postgres'
import pg from 'pg'

import { env } from './env'

export const checkPointer = () => {
  const { Pool } = pg
  const pool = new Pool({
    user: env.DATABASE.USER,
    password: env.DATABASE.PASSWORD,
    host: env.DATABASE.HOST,
    port: env.DATABASE.PORT,
    database: env.DATABASE.DATABASE,
    ssl: {
      rejectUnauthorized: env.DATABASE.SSL_REJECT_UNAUTHORIZED ?? false,
    },
  })

  return new PostgresSaver(pool)
}
