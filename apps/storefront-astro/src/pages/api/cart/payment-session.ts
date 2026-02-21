import type { APIRoute } from "astro"
import { setAstroCookies } from "@/lib/data/cookies"
import { initiatePaymentSession, retrieveCart } from "@/lib/data/cart"

export const prerender = false

export const POST: APIRoute = async ({ request, cookies }) => {
  setAstroCookies(cookies)

  try {
    const { provider_id } = await request.json()
    const cart = await retrieveCart()
    if (!cart) {
      return new Response(JSON.stringify({ error: "Cart not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    const resp = await initiatePaymentSession(cart, { provider_id })
    return new Response(JSON.stringify(resp), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (e: unknown) {
    const message =
      e instanceof Error ? e.message : "Failed to initiate payment session"
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }
}
