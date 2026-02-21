import { sdk } from "@/lib/sdk"
import medusaError from "@/lib/util/medusa-error"
import type { HttpTypes } from "@medusajs/types"
import { getAuthHeaders } from "./cookies"

export const retrieveOrder = async (id: string) => {
  const headers = { ...getAuthHeaders() }

  return sdk.client
    .fetch<HttpTypes.StoreOrderResponse>(`/store/orders/${id}`, {
      method: "GET",
      query: {
        fields:
          "*payment_collections.payments,*items,*items.metadata,*items.variant,*items.product",
      },
      headers,
    })
    .then(({ order }) => order)
    .catch((err) => medusaError(err))
}

export const listOrders = async (
  limit: number = 10,
  offset: number = 0,
  filters?: Record<string, unknown>
) => {
  const headers = { ...getAuthHeaders() }

  return sdk.client
    .fetch<HttpTypes.StoreOrderListResponse>(`/store/orders`, {
      method: "GET",
      query: {
        limit,
        offset,
        order: "-created_at",
        fields: "*items,+items.metadata,*items.variant,*items.product",
        ...filters,
      },
      headers,
    })
    .then(({ orders }) => orders)
    .catch((err) => medusaError(err))
}
