import { sdk } from "@/lib/sdk"
import medusaError from "@/lib/util/medusa-error"
import type { HttpTypes } from "@medusajs/types"
import {
  getAuthHeaders,
  getCartId,
  removeAuthToken,
  removeCartId,
  setAuthToken,
} from "./cookies"

export const retrieveCustomer =
  async (): Promise<HttpTypes.StoreCustomer | null> => {
    const headers = getAuthHeaders()

    if (!("authorization" in headers)) return null

    return sdk.client
      .fetch<{ customer: HttpTypes.StoreCustomer }>(`/store/customers/me`, {
        method: "GET",
        query: { fields: "*orders" },
        headers,
      })
      .then(({ customer }) => customer)
      .catch(() => null)
  }

export const updateCustomer = async (body: HttpTypes.StoreUpdateCustomer) => {
  const headers = { ...getAuthHeaders() }

  return sdk.store.customer
    .update(body, {}, headers)
    .then(({ customer }) => customer)
    .catch(medusaError)
}

export async function signup({
  email,
  password,
  first_name,
  last_name,
  phone,
}: {
  email: string
  password: string
  first_name: string
  last_name: string
  phone?: string
}) {
  // Step 1: Register auth identity
  const token = await sdk.auth.register("customer", "emailpass", {
    email,
    password,
  })

  setAuthToken(token as string)

  const headers = { ...getAuthHeaders() }

  // Step 2: Create the customer record
  await sdk.store.customer.create(
    { email, first_name, last_name, phone },
    {},
    headers
  )

  // Step 3: Login to get a proper session token
  const loginToken = await sdk.auth.login("customer", "emailpass", {
    email,
    password,
  })

  setAuthToken(loginToken as string)

  // Step 4: Transfer anonymous cart to customer
  await transferCart()
}

export async function login({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const token = await sdk.auth.login("customer", "emailpass", {
    email,
    password,
  })

  setAuthToken(token as string)

  await transferCart()
}

export async function signout() {
  await sdk.auth.logout()
  removeAuthToken()
  removeCartId()
}

export async function transferCart() {
  const cartId = getCartId()
  if (!cartId) return

  const headers = getAuthHeaders()

  try {
    await sdk.store.cart.transferCart(cartId, {}, headers)
  } catch {
    // Cart transfer can fail if the cart is already owned — ignore
  }
}

export const addCustomerAddress = async (
  address: HttpTypes.StoreCreateCustomerAddress
) => {
  const headers = { ...getAuthHeaders() }

  return sdk.store.customer
    .createAddress(address, {}, headers)
    .then(({ customer }) => ({ success: true, customer }))
    .catch((err) => ({ success: false, error: err.toString() }))
}

export const updateCustomerAddress = async (
  addressId: string,
  address: HttpTypes.StoreUpdateCustomerAddress
) => {
  const headers = { ...getAuthHeaders() }

  return sdk.store.customer
    .updateAddress(addressId, address, {}, headers)
    .then(() => ({ success: true }))
    .catch((err) => ({ success: false, error: err.toString() }))
}

export const deleteCustomerAddress = async (addressId: string) => {
  const headers = { ...getAuthHeaders() }

  return sdk.store.customer
    .deleteAddress(addressId, headers)
    .then(() => ({ success: true }))
    .catch((err) => ({ success: false, error: err.toString() }))
}
