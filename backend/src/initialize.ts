import i18n from 'i18next'
import Backend from 'i18next-fs-backend'

import { env } from '@/utils/env'

console.log('Initializing i18n...')
// Initialize i18n and export the promise
export const initializationPromise = i18n
  .use(Backend)
  .init({
    backend: {
      loadPath: 'locales/{{lng}}/{{ns}}.json',
    },
    fallbackLng: env.LANGUAGE,
    preload: [env.LANGUAGE, 'en'], // Preload necessary languages
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => {
    console.log('i18n initialized successfully.')
    // You can add other async initializations here and chain promises
    // e.g., return connectToDatabase().then(() => console.log('DB connected'));
  })
  .catch((error) => {
    console.error('Failed to initialize i18n:', error)
    // Propagate the error to prevent the server from starting incorrectly
    throw error
  })

// Export the initialized i18n instance for use elsewhere if needed
// (Ensure it's only used *after* the promise resolves)
export { default as i18n } from 'i18next'
