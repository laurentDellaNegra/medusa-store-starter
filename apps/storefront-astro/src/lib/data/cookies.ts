import type { AstroCookies } from "astro"

let _cookies: AstroCookies | null = null

export function setAstroCookies(cookies: AstroCookies) {
  _cookies = cookies
}

function getCookies(): AstroCookies | null {
  return _cookies
}

export const getAuthHeaders = (): { authorization: string } | {} => {
  const cookies = getCookies()
  const token = cookies?.get("_medusa_jwt")?.value
  if (!token) return {}
  return { authorization: `Bearer ${token}` }
}

export const getCartId = (): string | undefined => {
  const cookies = getCookies()
  return cookies?.get("_medusa_cart_id")?.value
}

export const setCartId = (cartId: string) => {
  const cookies = getCookies()
  cookies?.set("_medusa_cart_id", cartId, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: "strict",
    secure: import.meta.env.PROD,
    path: "/",
  })
}

export const removeCartId = () => {
  const cookies = getCookies()
  cookies?.delete("_medusa_cart_id", { path: "/" })
}

export const setAuthToken = (token: string) => {
  const cookies = getCookies()
  cookies?.set("_medusa_jwt", token, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: "strict",
    secure: import.meta.env.PROD,
    path: "/",
  })
}

export const removeAuthToken = () => {
  const cookies = getCookies()
  cookies?.delete("_medusa_jwt", { path: "/" })
}

export const getCacheId = (): string | undefined => {
  const cookies = getCookies()
  return cookies?.get("_medusa_cache_id")?.value
}
