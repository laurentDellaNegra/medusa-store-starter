import { sdk } from "@/lib/sdk"
import type { HttpTypes } from "@medusajs/types"
import { getAuthHeaders } from "./cookies"

export const listCartPaymentMethods = async (regionId: string) => {
  const headers = { ...getAuthHeaders() }

  return sdk.client
    .fetch<HttpTypes.StorePaymentProviderListResponse>(
      `/store/payment-providers`,
      {
        method: "GET",
        query: { region_id: regionId },
        headers,
      }
    )
    .then(({ payment_providers }) =>
      payment_providers.sort((a, b) => (a.id > b.id ? 1 : -1))
    )
    .catch(() => null)
}
