import 'i18next'

// only import the base locale
import common from 'locales/th/common.json'
import product from 'locales/th/product.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: {
      common: typeof common
      product: typeof product
    }
  }
}
