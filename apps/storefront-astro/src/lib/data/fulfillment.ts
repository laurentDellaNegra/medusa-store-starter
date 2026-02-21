import { sdk } from "@/lib/sdk"
import type { HttpTypes } from "@medusajs/types"
import { getAuthHeaders } from "./cookies"

export const listCartShippingMethods = async (cartId: string) => {
  const headers = { ...getAuthHeaders() }

  return sdk.client
    .fetch<HttpTypes.StoreShippingOptionListResponse>(
      `/store/shipping-options`,
      {
        method: "GET",
        query: { cart_id: cartId },
        headers,
      }
    )
    .then(({ shipping_options }) => shipping_options)
    .catch(() => null)
}

export const calculatePriceForShippingOption = async (
  optionId: string,
  cartId: string,
  data?: Record<string, unknown>
) => {
  const headers = { ...getAuthHeaders() }

  const body: Record<string, unknown> = { cart_id: cartId }
  if (data) body.data = data

  return sdk.client
    .fetch<{ shipping_option: HttpTypes.StoreCartShippingOption }>(
      `/store/shipping-options/${optionId}/calculate`,
      {
        method: "POST",
        body,
        headers,
      }
    )
    .then(({ shipping_option }) => shipping_option)
    .catch(() => null)
}
