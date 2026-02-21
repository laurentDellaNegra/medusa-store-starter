import type { APIRoute } from "astro"
import { setAstroCookies } from "@/lib/data/cookies"
import { setShippingMethod } from "@/lib/data/cart"

export const prerender = false

export const POST: APIRoute = async ({ request, cookies }) => {
  setAstroCookies(cookies)

  try {
    const { cartId, shippingMethodId } = await request.json()
    await setShippingMethod({ cartId, shippingMethodId })
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (e: unknown) {
    const message =
      e instanceof Error ? e.message : "Failed to set shipping method"
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }
}
