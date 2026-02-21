import { sdk } from "@/lib/sdk"
import medusaError from "@/lib/util/medusa-error"
import type { HttpTypes } from "@medusajs/types"
import { getAuthHeaders, getCartId, setCartId, removeCartId } from "./cookies"
import { getRegion } from "./regions"

export async function retrieveCart(
  cartId?: string
): Promise<HttpTypes.StoreCart | null> {
  const id = cartId || getCartId()

  if (!id) return null

  const headers = { ...getAuthHeaders() }

  return sdk.client
    .fetch<{ cart: HttpTypes.StoreCart }>(`/store/carts/${id}`, {
      method: "GET",
      query: {
        fields:
          "*items, *region, *items.product, *items.variant, *items.thumbnail, *items.metadata, +items.total, *promotions, +shipping_methods.name",
      },
      headers,
    })
    .then(({ cart }) => cart)
    .catch(() => null)
}

export async function getOrSetCart(
  countryCode: string
): Promise<HttpTypes.StoreCart> {
  const region = await getRegion(countryCode)

  if (!region) {
    throw new Error(`Region not found for country code: ${countryCode}`)
  }

  const headers = { ...getAuthHeaders() }

  let cart = await retrieveCart()

  if (!cart) {
    const cartResp = await sdk.store.cart.create(
      { region_id: region.id },
      {},
      headers
    )
    cart = cartResp.cart
    setCartId(cart.id)
  }

  if (cart && cart.region_id !== region.id) {
    await sdk.store.cart.update(cart.id, { region_id: region.id }, {}, headers)
  }

  return cart
}

export async function addToCart({
  variantId,
  quantity,
  countryCode,
}: {
  variantId: string
  quantity: number
  countryCode: string
}) {
  if (!variantId) {
    throw new Error("Missing variant ID when adding to cart")
  }

  const cart = await getOrSetCart(countryCode)

  if (!cart) {
    throw new Error("Error retrieving or creating cart")
  }

  const headers = { ...getAuthHeaders() }

  await sdk.store.cart
    .createLineItem(cart.id, { variant_id: variantId, quantity }, {}, headers)
    .catch(medusaError)
}

export async function updateLineItem({
  lineId,
  quantity,
}: {
  lineId: string
  quantity: number
}) {
  const cartId = getCartId()
  if (!cartId) throw new Error("Missing cart ID when updating line item")

  const headers = { ...getAuthHeaders() }

  await sdk.store.cart
    .updateLineItem(cartId, lineId, { quantity }, {}, headers)
    .catch(medusaError)
}

export async function deleteLineItem(lineId: string) {
  const cartId = getCartId()
  if (!cartId) throw new Error("Missing cart ID when deleting line item")

  const headers = { ...getAuthHeaders() }

  await sdk.store.cart
    .deleteLineItem(cartId, lineId, {}, headers)
    .catch(medusaError)
}

export async function updateCart(data: HttpTypes.StoreUpdateCart) {
  const cartId = getCartId()
  if (!cartId) throw new Error("No existing cart found")

  const headers = { ...getAuthHeaders() }

  return sdk.store.cart
    .update(cartId, data, {}, headers)
    .then(({ cart }) => cart)
    .catch(medusaError)
}

export async function setShippingMethod({
  cartId,
  shippingMethodId,
}: {
  cartId: string
  shippingMethodId: string
}) {
  const headers = { ...getAuthHeaders() }

  return sdk.store.cart
    .addShippingMethod(cartId, { option_id: shippingMethodId }, {}, headers)
    .catch(medusaError)
}

export async function initiatePaymentSession(
  cart: HttpTypes.StoreCart,
  data: HttpTypes.StoreInitializePaymentSession
) {
  const headers = { ...getAuthHeaders() }

  return sdk.store.payment
    .initiatePaymentSession(cart, data, {}, headers)
    .catch(medusaError)
}

export async function applyPromotions(codes: string[]) {
  const cartId = getCartId()
  if (!cartId) throw new Error("No existing cart found")

  const headers = { ...getAuthHeaders() }

  return sdk.store.cart
    .update(cartId, { promo_codes: codes }, {}, headers)
    .then(({ cart }) => cart)
    .catch(medusaError)
}

export async function placeOrder(cartId?: string) {
  const id = cartId || getCartId()
  if (!id) throw new Error("No existing cart found when placing an order")

  const headers = { ...getAuthHeaders() }

  const cartRes = await sdk.store.cart
    .complete(id, {}, headers)
    .catch(medusaError)

  if (cartRes?.type === "order") {
    removeCartId()
    return { type: "order" as const, order: cartRes.order }
  }

  return { type: "cart" as const, cart: cartRes?.cart }
}
