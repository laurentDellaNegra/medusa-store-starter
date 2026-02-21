import type { APIRoute } from "astro"
import { setAstroCookies } from "@/lib/data/cookies"
import { updateCart } from "@/lib/data/cart"

export const prerender = false

export const POST: APIRoute = async ({ request, cookies }) => {
  setAstroCookies(cookies)

  try {
    const body = await request.json()
    const cart = await updateCart(body)
    return new Response(JSON.stringify({ cart }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to update cart"
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }
}
