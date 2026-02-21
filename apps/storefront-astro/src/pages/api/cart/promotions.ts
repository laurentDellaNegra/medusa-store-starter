import type { APIRoute } from "astro"
import { setAstroCookies } from "@/lib/data/cookies"
import { applyPromotions } from "@/lib/data/cart"

export const prerender = false

export const POST: APIRoute = async ({ request, cookies }) => {
  setAstroCookies(cookies)

  try {
    const { codes } = await request.json()
    const cart = await applyPromotions(codes)
    return new Response(JSON.stringify({ cart }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (e: unknown) {
    const message =
      e instanceof Error ? e.message : "Failed to apply promotions"
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  }
}
