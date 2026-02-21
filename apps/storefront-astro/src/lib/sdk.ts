import Medusa from "@medusajs/js-sdk"

const MEDUSA_BACKEND_URL =
  process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"

export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: import.meta.env.DEV,
  publishableKey: import.meta.env.PUBLIC_MEDUSA_PUBLISHABLE_KEY,
})
