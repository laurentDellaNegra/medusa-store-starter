import type { APIRoute } from "astro"
import { setAstroCookies } from "@/lib/data/cookies"
import { placeOrder } from "@/lib/data/cart"

export const prerender = false

export const POST: APIRoute = async ({ cookies }) => {
  setAstroCookies(cookies)

  try {
    const result = await placeOrder()
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to place order"
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }
}
